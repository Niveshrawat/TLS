import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const ProfileDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [basicDetails, setBasicDetails] = useState({
    name: '',
    dob: '',
    socialCategory: '',
    gender: '',
    maritalStatus: '',
    physicallyChallenged: false,
  });
  const [contactDetails, setContactDetails] = useState({
    mobileNumber: '',
    email: '',
    city: '',
    state: '', 
  });
  const [educationDetails, setEducationDetails] = useState({
    class10: { board: '', schoolName: '', passingYear: '', percentage: '' },
    class12: { board: '', schoolName: '', passingYear: '', percentage: '' },
    graduation: { collegeName: '', passingYear: '', degree: '', percentage: '' },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
          },
        });
        const user = response.data.user;
        if (user) {
          setBasicDetails({
            name: user.name || '',
            dob: user.dob || '',
            socialCategory: user.socialCategory || '',
            gender: user.gender || '',
            maritalStatus: user.maritalStatus || '',
            physicallyChallenged: user.physicallyChallenged || false,
          });
          setContactDetails({
            mobileNumber: user.phone || '',
            email: user.email || '',
            city: user.city || '',
            state: user.state || '',
          });
          setEducationDetails({
            class10: user.class10 || { board: '', schoolName: '', passingYear: '', percentage: '' },
            class12: user.class12 || { board: '', schoolName: '', passingYear: '', percentage: '' },
            graduation: user.graduation || { collegeName: '', passingYear: '', degree: '', percentage: '' },
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    // Fetch profile from backend
    fetchProfile();

    // Prepopulate fields from localStorage if profile data is not available in backend
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setBasicDetails({
        name: storedUser.name || '',
        dob: storedUser.dob || '',
        socialCategory: storedUser.socialCategory || '',
        gender: storedUser.gender || '',
        maritalStatus: storedUser.maritalStatus || '',
        physicallyChallenged: storedUser.physicallyChallenged || false,
      });
      setContactDetails({
        mobileNumber: storedUser.phone || '',
        email: storedUser.email || '',
        city: storedUser.city || '',
        state: storedUser.state || '',
      });
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      handleSaveProfile();
    }
  };

  const handleInputChange = (e, section, field) => {
    const { name, value } = e.target;

    if (section === 'basicDetails') {
      setBasicDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    } else if (section === 'contactDetails') {
      setContactDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    } else if (section === 'educationDetails') {
      const [educationLevel, educationField] = field.split('.');

      setEducationDetails((prevDetails) => ({
        ...prevDetails,
        [educationLevel]: {
          ...prevDetails[educationLevel],
          [educationField]: value,
        },
      }));
    }
  };

  const handleSaveProfile = async () => {
    const updatedProfile = {
      ...basicDetails,
      phone: contactDetails.mobileNumber,
      email: contactDetails.email,
      city: contactDetails.city,
      state: contactDetails.state,
      class10: educationDetails.class10,
      class12: educationDetails.class12,
      graduation: educationDetails.graduation,
    };

    try {
      await axios.put('https://api.thelearnskills.com/api/v1/auth/profile', updatedProfile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">My Profile</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <Paper>
            <Box p={2} marginBottom='1rem' sx={{border: "1px solid #ddd"}}>
              <Typography variant="h6" marginBottom="2rem">Basic Details</Typography>
              <Grid container spacing={2} >
                {Object.entries(basicDetails).map(([key, value]) => (
                 <Grid item xs={12} sm={4} key={key}>
                 {key === 'socialCategory' || key === 'gender' || key === 'maritalStatus' ? (
                   <FormControl fullWidth>
                     <InputLabel>{key.replace(/([A-Z])/g, ' $1').trim()}</InputLabel>
                     <Select
                       name={key}
                       value={value} // Ensure this value matches one of the available options
                       onChange={(e) => handleInputChange(e, 'basicDetails')}
                       label={key.replace(/([A-Z])/g, ' $1').trim()}
                     >
                       {key === 'socialCategory' && [
                         <MenuItem key="general" value="general">General</MenuItem>,
                         <MenuItem key="obc" value="obc">OBC</MenuItem>,
                         <MenuItem key="sc" value="sc">SC</MenuItem>,
                         <MenuItem key="st" value="st">ST</MenuItem>,
                         <MenuItem key="other" value="other">Other</MenuItem>,
                       ]}
                       {key === 'gender' && [
                         <MenuItem key="male" value="male">Male</MenuItem>,
                         <MenuItem key="female" value="female">Female</MenuItem>,
                         <MenuItem key="other" value="other">Other</MenuItem>,
                       ]}
                       {key === 'maritalStatus' && [
                         <MenuItem key="married" value="married">Married</MenuItem>,
                         <MenuItem key="unmarried" value="unmarried">Unmarried</MenuItem>,
                       ]}
                     </Select>
                   </FormControl>
                 ) : (
                   <TextField
                     name={key}
                     label={key.replace(/([A-Z])/g, ' $1').trim()}
                     value={value}
                     onChange={(e) => handleInputChange(e, 'basicDetails')}
                     fullWidth
                     InputProps={{
                       readOnly: !isEditing,
                     }}
                   />
                 )}
               </Grid>
               
                ))}
              </Grid>
              <Button variant="contained" color="primary" onClick={handleEditToggle} sx={{ mt: 2 }}>
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Box p={2} marginBottom='1rem' sx={{border: "1px solid #ddd"}}>
              <Typography variant="h6" marginBottom="2rem">Contact Details</Typography>
              <Grid container spacing={2}>
                {Object.entries(contactDetails).map(([key, value]) => (
                  <Grid item xs={12} sm={4} key={key}>
                    <TextField
                      name={key}
                      label={key.replace(/([A-Z])/g, ' $1').trim()}
                      value={value}
                      onChange={(e) => handleInputChange(e, 'contactDetails')}
                      fullWidth
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button variant="contained" color="primary" onClick={handleEditToggle} sx={{ mt: 2 }}>
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Box p={2} marginBottom='1rem' sx={{border: "1px solid #ddd"}}>
              <Typography variant="h6" marginBottom="2rem">Education Details</Typography>
              <Grid container spacing={2}>
                {Object.entries(educationDetails).map(([educationLevel, fields]) =>
                  Object.entries(fields).map(([key, value]) => (
                    <Grid item xs={12} sm={4} key={`${educationLevel}.${key}`}>
                      <TextField
                        name={key}
                        label={`${educationLevel.replace(/([A-Z])/g, ' $1').trim()} - ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                        value={value}
                        onChange={(e) => handleInputChange(e, 'educationDetails', `${educationLevel}.${key}`)}
                        fullWidth
                        InputProps={{
                          readOnly: !isEditing,
                        }}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
              <Button variant="contained" color="primary" onClick={handleEditToggle} sx={{ mt: 2 }}>
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileDetails;
