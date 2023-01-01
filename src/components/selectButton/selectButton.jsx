import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as SelectMui } from '@mui/material';

export default function Select({ options, title, selected, setSelected }) {
  const handleChange = (event) => {
    const { value, name } = event.target;
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  return (
    selected &&
    options &&
    title && (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {title ? title : ''}
          </InputLabel>
          <SelectMui
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected}
            label={title}
            name={title?.toLowerCase()}
            onChange={handleChange}
          >
            {options.length > 0 &&
              options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
          </SelectMui>
        </FormControl>
      </Box>
    )
  );
}
