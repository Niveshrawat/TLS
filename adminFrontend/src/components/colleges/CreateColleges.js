import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField, IconButton, Grid, FormControl, Select, MenuItem
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);
  const [collegeId, setCollegeId] = useState(null); // State to store the newly created college ID
  // const [file, setFile] = useState();
  const [photos, setPhotos] = useState([]);
  const[collegeUrl, setCollegeUrl] =useState();

  
  
  

  const [formData, setFormData] = useState({
    collegeId:'',
    name: '',
    aboutCollege: '',
    location: '',
    rating: '',
    nirfRank: '',
    photos: [],
    aboutCourses: '',
    courses: [],
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
    courseRankings: [],
  });

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/v1/college/colleges', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchColleges();
  }, []);

  const handleClickOpen = () => {
    setEditMode(false);
    setFormData({
      collegeId:'',
      name: '',
      aboutCollege: '',
      location: '',
      rating: '',
      nirfRank: '',
      photos: [],
      aboutCourses: '',
      courses: [],
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
      courseRankings: [],
    });
    setOpen(true);
    setStep(1);
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log(selectedFiles); // Log the selected files
    setPhotos((prevPhotos) => [...prevPhotos, ...selectedFiles]);
  };

  React.useEffect(() => {
    console.log(photos); // Log the photos state
  }, [photos]);
  
  
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: files ? files[0] : value
    }));
  };

  const handleCourseChange = (e, index) => {
    const { name, value } = e.target;
    const newCourses = [...formData.courses];
    newCourses[index][name] = value;
    setFormData(prevFormData => ({
      ...prevFormData,
      courses: newCourses
    }));
  };
  const handleRankChange = (e, index) => {
    const { name, value } = e.target;
    const newRanks = [...formData.courseRankings];
    newRanks[index][name] = value;
    setFormData(prevFormData => ({
      ...prevFormData,
      courseRankings: newRanks
    }));
  };

  const handleAddCourse = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      courses: [...prevFormData.courses, { courseName: '', tutionFee: '', eligibility: '' }]
    }));
  };

  const handleAddRank = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      courseRankings: [...prevFormData.courseRankings, { courseName: '', rank: '' }]
    }));
  };

  const handleEdit = (college) => {
    setEditMode(true);
    setSelectedCollegeId(college._id);
    console.log(college._id, 'taruns')
    setFormData({
      collegeId: college._id,
      name: college.name,
      aboutCollege: college.aboutCollege,
      location: college.location,
      rating: college.rating,
      nirfRank: college.nirfRank,
      photos: college.photos || [],
      aboutCourses: college.aboutCourses,
      courses: college.courses || [],
      aboutAdmissionProcess: college.aboutAdmissionProcess,
      programmesOffered: college.programmesOffered,
      admissionStatus: college.admissionStatus,
      howToApply: college.howToApply,
      levelsOfProgrammesOffered: college.levelsOfProgrammesOffered,
      popularProgrammes: college.popularProgrammes,
      highestPackage: college.highestPackage,
      averagePackage: college.averagePackage,
      totalRecruiters: college.totalRecruiters,
      totalOffers: college.totalOffers,
      averagePackagesLastTwoYears: college.averagePackagesLastTwoYears,
      topRecruitingCompanies: college.topRecruitingCompanies,
      courseRankings: college.courseRankings|| [],
      
    });
    setOpen(true);
    setStep(1);
  };

  

  const handleDelete = async (collegeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8080/api/v1/college/colleges/${collegeId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setColleges(prevColleges => prevColleges.filter(college => college.id !== collegeId));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleNext = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

    
      const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'photos') {
        photos.forEach(photo => formDataToSend.append('photos', photo));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

      if(!editMode){
        switch (step) {
          case 1:
   const createCollegeResponse = await axios.post('http://localhost:8080/api/v1/college/create-colleges', formDataToSend, {
            ...config,
            headers: {
              ...config.headers,
              'Content-Type': 'multipart/form-data'
            }
          });
                    setSelectedCollegeId(createCollegeResponse.data.id); // Assuming the API returns the created college's ID
            setCollegeId(createCollegeResponse.data.id)
            console.log("ss",createCollegeResponse,"qq",selectedCollegeId)
            break;
          case 2:
            if (!formData.aboutCourses || !formData.courses || !Array.isArray(formData.courses) || formData.courses.length === 0) {
              alert("All fields are required and courses should be an array with at least one entry");
              return;
            }
            await axios.post('http://localhost:8080/api/v1/college/create-coursesAndFees', { ...formData, collegeId }, config); // Pass collegeId from state
            setStep(step + 1);
            break;
          case 3:
            await axios.post('http://localhost:8080/api/v1/college/create-admissions', { ...formData, collegeId: selectedCollegeId }, config);
            break;
          case 4:
            await axios.post('http://localhost:8080/api/v1/college/create-placements', { ...formData, collegeId: selectedCollegeId }, config);
            
            break;
          case 5:
            await axios.post('http://localhost:8080/api/v1/college/create-rankingHighlights', { ...formData, collegeId: selectedCollegeId }, config);
            handleClose();
            break;
          default:
            break;
        }
      }else{
        switch (step) {
          case 1:
            console.log(collegeId,'3333333')
   const createCollegeResponse = await axios.put(`http://localhost:8080/api/v1/college/colleges/${collegeUrl}`, formDataToSend, {
            ...config,
            headers: {
              ...config.headers,
              'Content-Type': 'multipart/form-data'
            }
          });
          
                    setSelectedCollegeId(createCollegeResponse.data.id); // Assuming the API returns the created college's ID
            setCollegeId(createCollegeResponse.data.id)
            console.log("ss",createCollegeResponse,"qq",selectedCollegeId)
            break;
          case 2:
            if (!formData.aboutCourses || !formData.courses || !Array.isArray(formData.courses) || formData.courses.length === 0) {
              alert("All fields are required and courses should be an array with at least one entry");
              return;
            }
            await axios.put(`http://localhost:8080/api/v1/college/courseAndFee/${collegeUrl}`, { ...formData, collegeId }, config); // Pass collegeId from state
            setStep(step + 1);
            break;
          case 3:
            await axios.put(`http://localhost:8080/api/v1/college/admission/${collegeUrl}`, { ...formData, collegeId: selectedCollegeId }, config);
            break;
          case 4:
            await axios.put(`http://localhost:8080/api/v1/college/placement/${collegeUrl}`, { ...formData, collegeId: selectedCollegeId }, config);
            
            break;
          case 5:
            await axios.put(`http://localhost:8080/api/v1/college/rankingHighlight/${collegeUrl}`, { ...formData, collegeId: selectedCollegeId }, config);
            handleClose();
            break;
          default:
            break;
        }
      }
      setStep(step + 1);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
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
              required
            />
            <TextField
              margin="dense"
              label="About College"
              type="text"
              fullWidth
              name="aboutCollege"
              value={formData.aboutCollege}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Location"
              type="text"
              fullWidth
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Rating"
              type="text"
              fullWidth
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Nirf Rank"
              type="text"
              fullWidth
              name="nirfRank"
              value={formData.nirfRank}
              onChange={handleChange}
            />
           
             <div>
              <Button variant="contained" component="label">
                Upload Photo
                <input type="file" hidden name="photos" onChange={handleImageChange} multiple />
              </Button>
              <div>
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`College Photo ${index + 1}`}
                    width="100"
                    height="100"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <TextField
              margin="dense"
              label="College Id"
              type="text"
              fullWidth
              name="collegeId"
              value={collegeId}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="About Courses"
              type="text"
              fullWidth
              name="aboutCourses"
              value={formData.aboutCourses}
              onChange={handleChange}
              required
            />
            {formData.courses.map((course, index) => (
              <Grid container spacing={2} alignItems="center" key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    margin="dense"
                    label="Course Name"
                    type="text"
                    fullWidth
                    name="courseName"
                    value={course.courseName}
                    onChange={(e) => handleCourseChange(e, index)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    margin="dense"
                    label="Tution Fee"
                    type="text"
                    fullWidth
                    name="tutionFee"
                    value={course.tutionFee}
                    onChange={(e) => handleCourseChange(e, index)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    margin="dense"
                    label="Eligibility"
                    type="text"
                    fullWidth
                    name="eligibility"
                    value={course.eligibility}
                    onChange={(e) => handleCourseChange(e, index)}
                    required
                  />
                </Grid>
              </Grid>
            ))}
            <Button onClick={handleAddCourse} color="primary">
              Add Course
            </Button>
          </div>
        );
      case 3:
        return (
          <div>
            <TextField
              margin="dense"
              label="College Id"
              type="text"
              fullWidth
              name="collegeId"
              value={collegeId}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="About Admission Process"
              type="text"
              fullWidth
              name="aboutAdmissionProcess"
              value={formData.aboutAdmissionProcess}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Programmes Offered"
              type="text"
              fullWidth
              name="programmesOffered"
              value={formData.programmesOffered}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth>
              <Select
                value={formData.admissionStatus}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                name="admissionStatus"
              >
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="How to Apply"
              type="text"
              fullWidth
              name="howToApply"
              value={formData.howToApply}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Levels of Programmes Offered"
              type="text"
              fullWidth
              name="levelsOfProgrammesOffered"
              value={formData.levelsOfProgrammesOffered}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Popular Programmes"
              type="text"
              fullWidth
              name="popularProgrammes"
              value={formData.popularProgrammes}
              onChange={handleChange}
              required
            />
          </div>
        );
      
      case 4:
        return (
          <div>
            <TextField
              margin="dense"
              label="College Id"
              type="text"
              fullWidth
              name="collegeId"
              value={collegeId}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Highest Package"
              type="text"
              fullWidth
              name="highestPackage"
              value={formData.highestPackage}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Average Package"
              type="text"
              fullWidth
              name="averagePackage"
              value={formData.averagePackage}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Total Recruiters"
              type="text"
              fullWidth
              name="totalRecruiters"
              value={formData.totalRecruiters}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Total Offers"
              type="text"
              fullWidth
              name="totalOffers"
              value={formData.totalOffers}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Average Packages Last Two Years"
              type="text"
              fullWidth
              name="averagePackagesLastTwoYears"
              value={formData.averagePackagesLastTwoYears}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Top Recruiting Companies"
              type="text"
              fullWidth
              name="topRecruitingCompanies"
              value={formData.topRecruitingCompanies}
              onChange={handleChange}
              required
            />
          </div>
        );
        case 5:
          return(
            <div>
              <TextField
              margin="dense"
              label="College Id"
              type="text"
              fullWidth
              name="collegeId"
              value={collegeId}
              onChange={handleChange}
              required
            />
            {formData.courseRankings.map((rank, index) => (
              <Grid container spacing={2} alignItems="center" key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    margin="dense"
                    label="Course Name"
                    type="text"
                    fullWidth
                    name="courseName"
                    value={rank.courseName}
                    onChange={(e) => handleRankChange(e, index)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    margin="dense"
                    label="Rank"
                    type="text"
                    fullWidth
                    name="rank"
                    value={rank.rank}
                    onChange={(e) => handleRankChange(e, index)}
                    required
                  />
                </Grid>
                
              </Grid>
            ))}
            <Button onClick={handleAddRank} color="primary">
              Add Rank
            </Button>
            </div>
          )
      default:
        return null;
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create College
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create College</DialogTitle>
        <DialogContent>
          {renderFormStep()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* {step !== 1 && (
            <Button onClick={handleBack} color="primary">
              Back
            </Button>
          )} */}
          {step !== 5 ? (
            <Button onClick={handleNext} color="primary">
              Next
            </Button>
          ) : (
            <Button onClick={handleNext} color="primary">
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} sx={{marginTop:'2rem'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Sr No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>College Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>NIRF Rank</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize:'1rem', border: 'none' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colleges.map((college,index) => (
              <TableRow key={college._id}>
                <TableCell sx={{ fontWeight: 'bold'}}>{index + 1}</TableCell>
                <TableCell>{college.name}</TableCell>
                <TableCell>{college.location}</TableCell>
                <TableCell>{college.rating}</TableCell>
                <TableCell>{college.nirfRank}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" onClick={() => {
                    handleEdit(college)
                    setCollegeUrl(college._id)
                    } } sx={{color:'blue'}}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(college.id)} sx={{color:'red'}}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CollegeTable;