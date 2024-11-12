import { Box, Typography } from "@mui/material";
import React from "react";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";

const RefundPolicy =() =>{
    return(
        <Box>
      <Navbar />
      <Box
      sx={{
        width:'90%'
      }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mt: 5,
            mb: 10,
            fontWeight: "bold",
            ml: 5
          }}
        >
         Refund Policy
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            mb: 20,
            ml: 5

          }}
        >
         Our platform provides free limited access to the App and some content after logging in. You can decide based on this whether to enrol or not. We stand by the quality and depth of the content we provide and do not offer refunds. All payments on this platform will be irrevocable, non-refundable, non-transferable, and non-creditable.

<br></br><strong>The enrollment once made cannot be canceled.</strong>


        </Typography>

      </Box>
      <Footer/>
    </Box>
        )
        }
        export default RefundPolicy;