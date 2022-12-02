import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  locationOptions: string[];
  onChange: (location: string) => void;
  value: string;
}

const LocationSelector: React.FC<Props> = ({
  locationOptions,
  onChange,
  value,
}: Props) => {
  return (
    <FormControl variant="outlined" sx={{ minWidth: "200px" }}>
      <InputLabel variant="outlined" id="location-label">
        Location
      </InputLabel>
      <Select
        labelId="location-label"
        label="location"
        value={value}
        onChange={(event: SelectChangeEvent<string>) => {
          onChange(event?.target?.value);
        }}
      >
        {locationOptions.map((location: string) => {
          return (
            <MenuItem key={`location_option_${location}`} value={location}>
              {location}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default LocationSelector;
