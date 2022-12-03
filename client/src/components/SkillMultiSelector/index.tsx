import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface Props {
  skillOptions: string[];
  value: string[];
  onChange: (skills: string[]) => void;
}

const SkillMultiSelector: React.FC<Props> = ({ skillOptions, value, onChange }: Props) => {
  return (
    <Autocomplete
      multiple
      limitTags={4}
      options={skillOptions}
      defaultValue={[]}
      value={value}
      onChange={(_event: React.SyntheticEvent, value: string[]) => onChange(value)}
      renderInput={(params) => <TextField variant="outlined" {...params} label="Skills" />}
      sx={{ width: '100%' }}
    />
  );
};

export default SkillMultiSelector;
