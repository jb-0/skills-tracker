import React from 'react';
import { JobCountChart } from './JobCountChart';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { TrendingSearchResult } from '../../api';

interface ISearchCardProps {
  searchResult: TrendingSearchResult;
}

const SearchCard: React.FunctionComponent<ISearchCardProps> = ({ searchResult }: ISearchCardProps) => {
  if (!searchResult) return null;

  const locationCapitalised =
    searchResult.searchTerms.locationName.charAt(0).toUpperCase() + searchResult.searchTerms.locationName.slice(1);

  return (
    <Card sx={{ width: '500px', maxWidth: '100%', height: '250px' }}>
      <CardContent>
        <Typography variant="h6">🛠️ {searchResult.searchTerms.keywords.replace(' ', ' • ')}</Typography>
        <Typography color="text.secondary">📍 {locationCapitalised}</Typography>
        <Box width="100%" height="100%">
          <JobCountChart search={searchResult} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
