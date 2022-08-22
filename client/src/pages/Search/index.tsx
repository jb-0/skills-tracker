import React from 'react';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { SearchContext } from '../../context/SearchContext';
import bgImage from '../../images/search.png';
import bgImageSm from '../../images/search-sm.png';
import { getSaved, getSearch, saveSearch } from '../../api';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { UserContext } from '../../context/UserContext';

const Search: React.FunctionComponent = () => {
  const [userState] = React.useContext(UserContext);
  const [search] = React.useContext(SearchContext);
  const searchTerms = search.searchTerms.join(' ');

  const { invalidateQueries } = useQueryClient();
  const saveMutation = useMutation(saveSearch.fn, { onSettled: () => invalidateQueries(getSaved.key) });
  const { data: searchResults = {} } = useQuery(
    ['search', searchTerms],
    () => getSearch.fn(searchTerms, search.location),
    { enabled: search.searchTerms.length > 0 }
  );

  const containerPadding = 4;
  const containerTopPadding = 6;

  return (
    <Box
      p={containerPadding}
      pt={containerTopPadding}
      minHeight="100%"
      width="100%"
      sx={{
        backgroundImage: { xs: `url(${bgImageSm})`, md: `url(${bgImage})` },
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Box maxWidth="sm" mx="auto">
        <Typography variant="h3">Search for your skillset</Typography>
        <Typography>
          Select a location and begin typing a skill, click a skill from the predefined list to add it to your search.
          Finally click the search button to start searching.
        </Typography>
        <Box component="form" mt={4} display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
          {/* Location */}
          <FormControl>
            <InputLabel variant="standard" id="location-label">
              Location
            </InputLabel>
            <Select
              labelId="location-label"
              label="location"
              variant="standard"
              name="location"
              value={search.location}
              onChange={search.handleDropDownSelectUpdates}
            >
              {search.permittedTerms.locations.map((location: string) => {
                return (
                  <MenuItem key={`location_option_${location}`} value={location}>
                    {location}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* Skills */}
          <Autocomplete
            multiple
            limitTags={4}
            options={search.permittedTerms.skills}
            defaultValue={[]}
            value={search.searchTerms}
            onChange={(_event: React.SyntheticEvent, value: string[]) => search.updateSkills(value)}
            renderInput={(params) => <TextField variant="standard" {...params} label="Skills" />}
            sx={{ width: '100%' }}
          />

          {/* Results */}
          {search.searchTerms.length > 0 && searchResults?.noOfResults ? (
            <Box>
              <Box
                p={1}
                width="fit-content"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  borderRadius: '10px',
                  backgroundColor: 'primary.main',
                }}
              >
                <Box>
                  <Typography color="common.white">No. of jobs found:</Typography>
                  <Typography variant="h3" color="common.white">
                    {searchResults?.noOfResults}
                  </Typography>
                </Box>
              </Box>
              {userState.authenticated ? (
                <Button
                  onClick={() => {
                    saveMutation.mutate({
                      keywords: searchTerms,
                      locationName: search.location,
                      distanceFromLocation: 10,
                    });
                  }}
                  sx={{ mt: 2, width: '100%' }}
                  variant="contained"
                >
                  Save
                </Button>
              ) : null}
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
