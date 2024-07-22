import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddCollegeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    aboutCollege: '',
    location: '',
    rating: '',
    nirfRank: '',
    photos: '',
    aboutAdmissionProcess: '',
    programmesOffered: '',
    admissionStatus: 'ongoing',
    howToApply: '',
    levelsOfProgrammesOffered: '',
    popularProgrammes: '',
    highestPackage: '',
    averagePackage: '',
    totalRecruiters: '',
    totalOffers: '',
    averagePackagesLastTwoYears: '',
    topRecruitingCompanies: '',
    courseName: '', 
    rank: '',
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/v1/college/create-colleges', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      navigate('/');
    })
    .catch(error => console.error('Error creating data:', error));
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <TextField
              margin="dense"
              label="College Name"
              type="text"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="About College"
              type="text"
              fullWidth
              name="aboutCollege"
              value={formData.aboutCollege}
              onChange={handleChange}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <TextField
          margin="dense"
          label="About Courses"
          type="text"
          fullWidth
          name="aboutCourses"
          value={formData.aboutCourses}
          onChange={handleChange}
        />
        {formData.courses.map((course, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                label="Course Name"
                type="text"
                fullWidth
                name="courseName"
                value={formData.courseName}
                onChange={ handleCourseChange(index, e)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                label="Tuition Fee"
                type="text"
                fullWidth
                name="tutionFee"
                value={formData.tutionFee}
                onChange={(e) => handleCourseChange(index, e)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                margin="dense"
                label="Eligibility"
                type="text"
                fullWidth
                name="eligibility"
                value={course.eligibility}
                onChange={ handleCourseChange}
              />
              </Grid>
            </Grid>
            ))}
                        </div>
        )
      case 3:
        return (
          <div>
          <TextField
          label="About Admission Process"
          name="aboutAdmissionProcess"
          value={formData.aboutAdmissionProcess}
          onChange={handleChange}
          required
        />
        <TextField
          label="Programmes Offered"
          name="programmesOffered"
          value={formData.programmesOffered}
          onChange={handleChange}
          required
        />
        <FormControl required>
          <InputLabel id="admission-status-label">Admission Status</InputLabel>
          <Select
            labelId="admission-status-label"
            name="admissionStatus"
            value={formData.admissionStatus}
            onChange={handleChange}
            required
          >
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="How to Apply"
          name="howToApply"
          value={formData.howToApply}
          onChange={handleChange}
          required
        />
        <TextField
          label="Levels of Programmes Offered"
          name="levelsOfProgrammesOffered"
          value={formData.levelsOfProgrammesOffered}
          onChange={handleChange}
          required
        />
        <TextField
          label="Popular Programmes"
          name="popularProgrammes"
          value={formData.popularProgrammes}
          onChange={handleChange}
          required
        />
          </div>
        )
        case 4:
        return(
      <div>
 <TextField
          label="Highest Package"
          name="highestPackage"
          value={formData.highPackage}
          onChange={handleChange}
          required
        />
         <TextField
          label="Average Package"
          name="averagePackage"
          value={formData.averagePackage}
          onChange={handleChange}
          required
        />
        <TextField
          label="Total Recuriters"
          name="totalRecuriters"
          value={formData.totalRecuriters}
          onChange={handleChange}
          required
        />

<TextField
          label="Total offers"
          name="totalOffers"
          value={formData.totalOffers}
          onChange={handleChange}
          required
        />
        <TextField
          label="Average Package of Last 2years"
          name="averagePackagesLastTwoYears"
          value={formData.averagePackagesLastTwoYears}
          onChange={handleChange}
          required
        />
        <TextField
          label="Top Recruting Companies"
          name="topRecrutingCompanies"
          value={formData.topRecrutingCompanies}
          onChange={handleChange}
          required
        />

      </div>
        )
        case 5:
          return(
            <div>
                 <TextField
                label="Course Name"
                variant="outlined"
                value={formData.courseName}
                onChange={ handleChangeRanking}
                fullWidth
                required
                margin="normal"
              />
              <TextField
               
                label="Rank"
                variant="outlined"
                type="number"
                value={formData.rank}
                onChange={ handleChangeRanking}
                fullWidth
                required
                margin="normal"
              />           
            </div>
          )
      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onClose={() => navigate('/')}>
      <DialogTitle>Create College</DialogTitle>
      <DialogContent>
        {renderFormStep()}
      </DialogContent>
      <DialogActions>
        {step > 1 && (
          <Button onClick={handleBack} color="primary">
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={handleNext} color="primary">
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddCollegeForm;
