import React from 'react';
import { JobCountChart } from './JobCountChart';
import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { TrackedSearchResult } from '../../api';
import { Delete } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

interface ISearchCardProps {
  searchResult: TrackedSearchResult;
  onDeleteClick?: () => void;
}

const SearchCardResult: React.FunctionComponent<ISearchCardProps> = ({
  searchResult,
  onDeleteClick,
}: ISearchCardProps) => {
  const isEditable = !!onDeleteClick;
  if (!searchResult) return null;

  const locationCapitalised =
    searchResult.searchTerms.locationName.charAt(0).toUpperCase() + searchResult.searchTerms.locationName.slice(1);

  return (
    <Card
      sx={{
        width: '500px',
        maxWidth: '100%',
        height: isEditable ? '300px' : '280px',
        border: '1px solid',
        borderColor: grey['200'],
      }}
      elevation={0}
    >
      <CardContent sx={{ height: '250px' }}>
        <Typography
          variant="subtitle1"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {`💎  ${searchResult.searchTerms.keywords.replace(' ', ' • ')}`}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">{`📍  ${locationCapitalised}`}</Typography>
        <Box width="100%" height="190px">
          <JobCountChart search={searchResult} />
        </Box>
      </CardContent>
      {isEditable ? (
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton aria-label="delete saved search" onClick={onDeleteClick}>
            <Delete />
          </IconButton>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default SearchCardResult;
