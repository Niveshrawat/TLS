import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid, Chip } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobPostingForm = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    companyName: '',
    salaryRange: '',
    location: '',
    aboutJob: '',
    applicationLastDate: '',
    skills: [],
    whoCanApply: '',
    numberOfOpenings: '',
    aboutCompany: ''
  });

  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault(); // Prevent form submission on Enter
      if (!jobDetails.skills.includes(skillInput)) {
        setJobDetails({
          ...jobDetails,
          skills: [...jobDetails.skills, skillInput]
        });
      }
      setSkillInput('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setJobDetails({
      ...jobDetails,
      skills: jobDetails.skills.filter((skill) => skill !== skillToDelete)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.thelearnskills.com/api/v1/job-postings/create', jobDetails, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Job posting created:', response.data);
      toast.success('Job posted successfully!');
    } catch (err) {
      console.error('Job posting failed', err);
      toast.error('Failed to post job.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <Box sx={{ color: 'blue' }}>
        <Typography variant="h4" mb={2} ml={8} fontWeight="bold">Job Details</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Box
            p={3}
            bgcolor="background.paper"
            boxShadow={3}
            borderRadius={2}
            marginTop="1rem"
            width="100%"
            maxWidth="1200px"
            textAlign="left"
            component={Paper}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">Job Title</Typography>
                  <TextField
                    label="Job Title"
                    name="title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={jobDetails.title}
                    onChange={handleChange}
                    sx={{ bgcolor: '#C7C8CC', borderRadius: 2, border: 'none' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">Company Name</Typography>
                  <TextField
                    label="Company Name"
                    name="companyName"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={jobDetails.companyName}
                    onChange={handleChange}
                    sx={{ bgcolor: '#C7C8CC', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Job Details</Typography>
                  <TextField
                    label="About Job"
                    name="aboutJob"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={jobDetails.aboutJob}
                    onChange={handleChange}
                    sx={{ bgcolor: '#C7C8CC', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">Salary Range</Typography>
                  <TextField
                    label="Salary Range"
                    name="salaryRange"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={jobDetails.salaryRange}
                    onChange={handleChange}
                    sx={{ bgcolor: '#C7C8CC', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">Location</Typography>
                  <TextField
                    label="Location"
                    name="location"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={jobDetails.location}
                    onChange={handleChange}
                    sx={{ bgcolor: '#C7C8CC', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">Application Last Date</Typography>
                  <TextField
                    label="Application Last Date"
                    name="applicationLastDate"
                    variant="outlined"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={jobDetails.applicationLastDate}
                    onChange={handleChange}
                    sx={{ bgcolor: '#C7C8CC', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">Number of Openings</Typography>
                  <TextField
                    label="Number of Openings"
                    name="numberOfOpenings"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={jobDetails.numberOfOpenings}
                    onChange={handleChange}
                    sx={{ bgcolor: '#C7C8CC', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">Who Can Apply</Typography>
                  <TextField
                    label="Who Can Apply"
                    name="whoCanApply"
                    variant="outlined"
                    fullWidth
                    rows={2}
                    margin="normal"
                    value={jobDetails.whoCanApply}
                    onChange={handleChange}
                    sx={{ bgcolor: '#C7C8CC', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Skills</Typography>
                  <TextField
                    label="Add Skills"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillAdd}
                    sx={{ bgcolor: '#C7C8CC', borderRadius: 1 }}
                  />
                  <Box mt={1} mb={2}>
                    {jobDetails.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        onDelete={() => handleSkillDelete(skill)}
                        sx={{ margin: 0.5 }}
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">About Company</Typography>
                  <TextField
                    label="About Company"
                    name="aboutCompany"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={jobDetails.aboutCompany}
                    onChange={handleChange}
                    sx={{ bgcolor: '#C7C8CC', borderRadius: 1 }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Post Job
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default JobPostingForm;
