// src/components/PaymentHistory.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const PaymentHistory = () => {
  const paymentHistory = []; // This should be dynamically fetched based on the user's data

  return (
    <Box p={3}>
      <Typography variant="h5">Payment History</Typography>
      {paymentHistory.length > 0 ? (
        <Box mt={2}>
          {paymentHistory.map((payment, index) => (
            <Typography key={index} variant="body1">{payment.detail}</Typography>
          ))}
        </Box>
      ) : (
        <Box mt={2} textAlign="center" marginTop="5rem">
          <Typography variant="body1" marginBottom="1rem" fontWeight="bold">No Payment History Available</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaymentHistory;
