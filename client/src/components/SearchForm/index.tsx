import React, { useState } from "react";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import getPermittedTerms from "../../services/getPermittedTerms";
import LocationSelector from "../LocationSelector";
import SkillMultiSelector from "../SkillMultiSelector";
import { getSearch } from "../../api";
import { Typography } from "@mui/material";

type FormData = {
  location: string;
  skills: string[];
};

const SearchForm: React.FC = () => {
  const [{ skills, location }, setFormData] = useState<FormData>({
    location: "London",
    skills: [],
  });

  const { data: permittedTerms } = useQuery({
    queryKey: ["get-permitted-terms"],
    queryFn: getPermittedTerms,
  });

  const { data: searchResult } = useQuery({
    queryKey: getSearch.key(skills, location),
    queryFn: () => getSearch.fn(skills.join(" "), location),
    enabled: skills.length > 0,
  });

  const updateFormValue = (key: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const displayNoResultsMessage =
    !!searchResult && searchResult?.noOfResults === 0;
  const displaySomeResultsMessage =
    !!searchResult && searchResult?.noOfResults > 0;

  return (
    <>
      <Box
        component="form"
        width="100%"
        pt={2}
        mb={2}
        display="flex"
        gap={2}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <LocationSelector
          locationOptions={permittedTerms?.locations || []}
          value={location}
          onChange={(location: string) => updateFormValue("location", location)}
        />

        <SkillMultiSelector
          skillOptions={permittedTerms?.skills || []}
          value={skills}
          onChange={(skills) => updateFormValue("skills", skills)}
        />
      </Box>

      {displaySomeResultsMessage ? (
        <Typography>
          There are currently <b>{searchResult?.noOfResults}</b> jobs in{" "}
          {location} matching your chosen skillset of {skills.join(", ")}
        </Typography>
      ) : null}

      {displayNoResultsMessage ? (
        <Typography>
          No results found for this location and skillset combination
        </Typography>
      ) : null}
    </>
  );
};

export default SearchForm;
