import React from 'react';
import { TextField, Box } from '@mui/material';

function InputBox({ type, placeholder, value, onChange }) {
  return (
    <Box sx={{ py: 2 }}>
      <TextField
        fullWidth
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        variant="outlined"
        size="small"
        InputProps={{
          sx: {
            padding: '8px' // Adjust padding if needed
          }
        }}
      />
    </Box>
  );
}

export default InputBox;
