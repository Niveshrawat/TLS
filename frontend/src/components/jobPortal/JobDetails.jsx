import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import UpdateIcon from "@mui/icons-material/Update";
import VideoResumeModal from "./VideoResumeModel";
import axios from "axios";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import JobInfoCard from "./JobInfoCard";
import { toast } from "react-toastify";

const JobDetails = () => {
  const location = useLocation();
  const { job } = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApply = async (video, resume) => {
    if (!video || !resume) {
      toast.error("Both video and resume files are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("jobId", job._id);
    formData.append("userId", "USER_ID"); // Replace with the actual user ID
    formData.append("video", video);
    formData.append("resume", resume);
  
    const token = localStorage.getItem("token");
  
    try {
      await axios.post(
        "https://api.thelearnskills.com/api/v1/job-applications/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Application submitted successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error(error.response?.data?.message || "Failed to submit application.");
    }
  };
  

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          mt: "2rem",
          px: { xs: 2, md: 2 },
        }}
      >
        <Card
          sx={{
            border: "1px solid #ddd",
            borderRadius: "20px",
            maxWidth: 1200,
            width: "100%",
            mr: { md: "8rem" },
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {job.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ mt: 2, textAlign: { xs: "center", md: "left" } }}
            >
              {job.companyName}
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md="auto">
                <Box display="flex" alignItems="center">
                  <CurrencyRupeeIcon sx={{ color: "green" }} />
                  <Typography variant="body1" ml={1} color="#686D76">
                    {job.salaryRange}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md="auto">
                <Box display="flex" alignItems="center">
                  <UpdateIcon sx={{ color: "gold" }} />
                  <Typography variant="body1" ml={1} color="#686D76">
                    {new Date(job.applicationLastDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md="auto">
                <Box display="flex" alignItems="center">
                  <LocationOnIcon sx={{ color: "red" }} />
                  <Typography variant="body2" ml={1} color="#686D76">
                    {job.location}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md="auto" sx={{ ml: { md: "auto" } }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleOpenModal}
                  sx={{
                    backgroundColor: "#003285",
                    width: { xs: "100%", md: "15rem" },
                    height: "3rem",
                    color: "white",
                  }}
                >
                  Apply For Job
                </Button>
              </Grid>
            </Grid>
            <Typography variant="body1" sx={{ mt: 2, textAlign: { xs: "center", md: "left" } }}>
              {job.aboutJob}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", p: { xs: 2, md: 4 } }}>
        <Grid container spacing={3} maxWidth={1400}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, mb: 4, border: "1px solid #ddd", borderRadius: "20px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                Key Responsibilities:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {job.whoCanApply}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                Number of Openings:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {job.numberOfOpenings}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                Skills:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {job.skills.map((skill, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    sx={{
                      color: "#003285",
                      borderColor: "#003285",
                      cursor: "auto",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#003285",
                        borderColor: "#003285",
                        transition: "background-color 0.3s, color 0.3s",
                      },
                    }}
                  >
                    {skill}
                  </Button>
                ))}
              </Box>
            </Card>
            <Card sx={{ p: 3, border: "1px solid #ddd", borderRadius: "20px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                  About Company
                </Typography>
                <Typography variant="body1">{job.aboutCompany}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <JobInfoCard job={job} />
          </Grid>
        </Grid>
      </Box>

      <VideoResumeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApply}
      />
      <Footer />
    </Box>
  );
};

export default JobDetails;
