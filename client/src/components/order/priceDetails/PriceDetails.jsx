import { Box, Paper, Typography, Divider } from '@mui/material';
import React from 'react';

function PriceDetails() {
  return (
    <Paper elevation={5} sx={{ padding: '20px', maxWidth: '100%', marginX: 'auto',marginBottom:'10px' }}>
      <Typography variant='h6' sx={{ marginBottom: '15px', fontWeight: 'bold' }}>
        Price Details
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography variant='body2'>Price:</Typography>
        <Typography variant='body2'>$100</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant='body2'>Shipping:</Typography>
        <Typography variant='body2'>$5</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant='body2'>Discount:</Typography>
        <Typography variant='body2' color="green">-$105</Typography>
      </Box>
      <Divider sx={{ margin: '15px 0' }} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant='h6' fontWeight="bold">Total:</Typography>
        <Typography variant='h6' fontWeight="bold">$105</Typography>
      </Box>
    </Paper>
  );
}

export default PriceDetails;
