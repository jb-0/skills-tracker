import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SearchCardResult from '../../components/SearchCardResult';
import { deleteSaved, getSaved } from '../../api';

const Profile: React.FunctionComponent = () => {
  const containerPadding = 4;
  const containerTopPadding = 6;

  const { invalidateQueries } = useQueryClient();

  const { data: savedSearchData = {}, isLoading: savedSearchIsLoading } = useQuery(getSaved.key, getSaved.fn);
  const showSavedSearch = savedSearchData?.savedSearches && savedSearchData?.savedSearches?.length > 0;
  const showWarning = !savedSearchIsLoading && !showSavedSearch;

  const deleteMutation = useMutation(deleteSaved.fn, { onSettled: () => invalidateQueries(getSaved.key) });

  return (
    <Box p={containerPadding} pt={containerTopPadding} maxWidth="md" mx="auto">
      <Typography variant="h4" pb={2}>
        {showWarning ? 'No saved searches' : showSavedSearch ? 'Saved searches' : ''}
      </Typography>
      {showWarning ? (
        <Typography>
          You have not yet saved any searches. To save a search go to the search page, search for skills you are
          interested in and hit save.
        </Typography>
      ) : showSavedSearch ? (
        <Grid container spacing={2} width="100%" m="0">
          {savedSearchData?.savedSearches?.map((searchResult, idx) => {
            return (
              <Grid
                item
                key={`saved_search_item_${idx}`}
                xs={12}
                sm={6}
                md={4}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <SearchCardResult
                  searchResult={searchResult}
                  onDeleteClick={() => deleteMutation.mutate(searchResult._id)}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Profile;
