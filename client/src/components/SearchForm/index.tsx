import { SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import getPermittedTerms from "../../services/getPermittedTerms";
import LocationSelector from "../LocationSelector";
import SkillMultiSelector from "../SkillMultiSelector";

type FormData = {
  location: string;
  skills: string[];
};

const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    location: "London",
    skills: [],
  });

  const { data: permittedTerms, isLoading: permittedTermsIsLoading } = useQuery(
    { queryKey: ["get-permitted-terms"], queryFn: getPermittedTerms }
  );

  const updateFormValue = (key: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Box component="form" width="100%" pt={2} display="flex" gap={2}>
      <LocationSelector
        locationOptions={permittedTerms?.locations || []}
        value={formData.location}
        onChange={(location: string) => updateFormValue("location", location)}
      />

      <SkillMultiSelector
        skillOptions={permittedTerms?.skills || []}
        value={formData.skills}
        onChange={(skills) => updateFormValue("skills", skills)}
      />
    </Box>
  );
};

export default SearchForm;
