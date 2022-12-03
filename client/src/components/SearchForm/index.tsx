import React, { useState } from 'react';
import { Box } from '@mui/system';
import { useMutation, useQuery } from '@tanstack/react-query';
import getPermittedTerms from '../../services/getPermittedTerms';
import LocationSelector from '../LocationSelector';
import SkillMultiSelector from '../SkillMultiSelector';
import { getSearch, saveSearch } from '../../api';
import { Button, Typography } from '@mui/material';

interface Props {
  showSaveButton?: true;
}

type FormData = {
  location: string;
  skills: string[];
};

const SearchForm: React.FC<Props> = ({ showSaveButton }: Props) => {
  const [{ skills, location }, setFormData] = useState<FormData>({
    location: '',
    skills: [],
  });

  const { data: permittedTerms, isLoading: permittedTermsIsLoading } = useQuery({
    queryKey: ['get-permitted-terms'],
    queryFn: getPermittedTerms,
  });

  const { data: searchResult, isLoading: searchResultIsLoading } = useQuery({
    queryKey: getSearch.key(skills, location),
    queryFn: () => getSearch.fn(skills.join(' '), location),
    enabled: skills.length > 0 && !!location,
  });

  const createSearch = useMutation(saveSearch.fn);
  const onClickSave = () => {
    createSearch.mutate({ keywords: skills.join(' '), locationName: location });
  };

  const updateFormValue = (key: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const displayNoResultsMessage = !!searchResult && searchResult?.noOfResults === 0;
  const displaySomeResultsMessage = !!searchResult && searchResult?.noOfResults > 0;

  const disabled = createSearch.isLoading || permittedTermsIsLoading || (skills.length > 0 && searchResultIsLoading);

  return (
    <>
      <Box
        component="form"
        width="100%"
        pt={2}
        mb={2}
        display="flex"
        gap={2}
        flexDirection={{ xs: 'column', sm: 'row' }}
        p={showSaveButton ? 4 : undefined}
      >
        <LocationSelector
          locationOptions={permittedTerms?.locations || []}
          value={location}
          onChange={(location: string) => updateFormValue('location', location)}
          disabled={disabled}
        />

        <SkillMultiSelector
          skillOptions={permittedTerms?.skills || []}
          value={skills}
          onChange={(skills) => updateFormValue('skills', skills)}
          disabled={disabled}
        />
      </Box>

      {displaySomeResultsMessage ? (
        <>
          <Typography>
            There are currently <b>{searchResult?.noOfResults}</b> jobs in {location} matching your chosen skillset of{' '}
            {skills.join(', ')}
          </Typography>

          {showSaveButton ? (
            <Button onClick={onClickSave} sx={{ mt: 2 }} disabled={disabled}>
              Save search
            </Button>
          ) : null}
        </>
      ) : null}

      {displayNoResultsMessage ? (
        <Typography>No results found for this location and skillset combination</Typography>
      ) : null}
    </>
  );
};

export default SearchForm;
