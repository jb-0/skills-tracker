import React from 'react';
import { Box, Typography, Grid, AlertTitle, Alert } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SearchCardResult from '../../components/SearchCardResult';
import { deleteSaved, getSaved } from '../../api';

const SavedSearches: React.FC = () => {
  const containerPadding = 4;

  const { invalidateQueries } = useQueryClient();

  const { data: savedSearchData = {}, isLoading: savedSearchIsLoading } = useQuery(getSaved.key, getSaved.fn);
  const showSavedSearch = savedSearchData?.savedSearches && savedSearchData?.savedSearches?.length > 0;
  const showWarning = !savedSearchIsLoading && !showSavedSearch;

  const deleteMutation = useMutation(deleteSaved.fn, { onSettled: () => invalidateQueries(getSaved.key) });

  return (
    <Box padding={containerPadding}>
      {showWarning ? (
        <Alert severity="info" sx={{ textAlign: 'left' }}>
          <AlertTitle>No saved searches</AlertTitle>
          You have not saved any searches. To save a search go to the search tab, search for skills you are interested
          in and hit save.
        </Alert>
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

export default SavedSearches;
