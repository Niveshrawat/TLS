import { Box, Typography } from "@mui/material";
import React from "react";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";

const PrivacyPolicy = () => {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: "90%",
          margin: "0 auto", // center content
        }}
      >
        {/* Main Heading */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mt: 5,
            mb: 5,
            fontWeight: "bold",
          }}
        >
          Privacy Policy
        </Typography>

        {/* Privacy Policy Content */}
        <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
          This Privacy Policy (“Privacy Policy”) describes how Bennett, Coleman & Co. Ltd. (For its Times Professional Learning Division), Times Center for Learning Limited and Times Edutech and Events Limited (collectively “we, our, us”) collect, use, disclose or transfer your personal information through our application “The Learn Skills” (“Application”) and website www.thelearnskills.com (“Website”), or any services provided to you through us (“Services”). The terms ‘you’ or ‘your’ in this Privacy Policy refer to you as the user of the Website, or any of the Services offered by us.
        </Typography>
        
        <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
          By providing your information or availing of our Services, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use, and agree to be governed by the laws of India including but not limited to the Information Technology Act 2000 and rules (“Applicable Laws”).
        </Typography>

        {/* Section A: General */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: 'blue' }}>
          A. General:
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          You can browse the Website/Application without telling us who you are or revealing any personal information about yourself. Once you give us your personal information, you are not anonymous to us. Where possible, we indicate which fields are required and which are optional. You always have the option to not provide information by choosing not to use a particular service or feature on the Website/Application.
        </Typography>

        {/* Section B: Collection of Personal Information */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: 'blue' }}>
          B. Collection of Personal Information:
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          We don’t ask you for personal information unless we truly need it. When you use our Website/Application, we collect and store your personal information which is provided by you from time to time. Our primary goal is to provide you with a safe, efficient, smooth, and customized experience. This allows us to provide services and features that most likely meet your needs and to customize our Website/Application to make your experience safer and easier.
        </Typography>

        {/* Section C: Use of Information */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: 'blue' }}>
          C. Use of Information:
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          We collect, use, process, combine, retain and store your personal information for purposes such as providing services, communicating with you, marketing, analytics, research, and complying with legal obligations.
        </Typography>

        {/* Section D: Disclosure of Information */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: 'blue' }}>
          D. Disclosure of Information:
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          We may share your personal information with third-party service providers who assist in delivering our services. We may also disclose personal information if required by law or to protect the rights and safety of our users.
        </Typography>

        {/* Additional sections as needed */}
        {/* ... */}

      </Box>
      <Footer />
    </Box>
  );
};

export default PrivacyPolicy;
