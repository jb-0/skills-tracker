import React from 'react';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { SearchContext } from '../../context/SearchContext';
import bgImage from '../../images/search.png';
import bgImageSm from '../../images/search-sm.png';
import { getSearch } from '../../api';
import { useQuery } from '@tanstack/react-query';

const Search: React.FunctionComponent = () => {
  const [search] = React.useContext(SearchContext);
  const searchTerms = search.searchTerms.join(' ');
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
            <Box
              p={1}
              width="fit-content"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                borderRadius: '10px',
                background: '#007FFF',
              }}
            >
              <Box>
                <Typography color="common.white">No. of jobs found:</Typography>
                <Typography variant="h3" color="common.white">
                  {searchResults?.noOfResults}
                </Typography>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
