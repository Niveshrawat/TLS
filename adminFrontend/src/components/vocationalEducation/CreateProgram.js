import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateProgram = () => {
  const [program, setProgram] = useState({
    programName: '',
    whoShouldAttend: [''],
    programContents: [{ SN: 1, ModuleName: '' }],
    description: '',
    aboutProgram: '',
    durationOfProgram: '',
    programAndClassSchedule: '',
    jobRoles: [''],
    admissionCriteria: [''],
    price: '',
    minAgeLimit: '',
    maxAgeLimit: '',
    rating: '',
  });

  // State for photo and certificateImage
  const [photo, setPhoto] = useState(null);
  const [certificateImage, setCertificateImage] = useState(null);

  // Previews for both images
  const [photoPreview, setPhotoPreview] = useState(null);
  const [certificateImagePreview, setCertificateImagePreview] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgram({
      ...program,
      [name]: value,
    });
  };

  const handleProgramContentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProgramContents = program.programContents.map((content, i) =>
      i === index ? { ...content, [name]: value } : content
    );
    setProgram({ ...program, programContents: updatedProgramContents });
  };

  const handleWhoShouldAttendChange = (index, e) => {
    const { value } = e.target;
    const updatedWhoShouldAttend = program.whoShouldAttend.map((attendee, i) =>
      i === index ? value : attendee
    );
    setProgram({ ...program, whoShouldAttend: updatedWhoShouldAttend });
  };

  const handleAdmissionCriteriaChange = (index, e) => {
    const { value } = e.target;
    const updatedAdmissionCriteria = program.admissionCriteria.map((criteria, i) =>
      i === index ? value : criteria
    );
    setProgram({ ...program, admissionCriteria: updatedAdmissionCriteria });
  };

  const handleJobRoleChange = (index, e) => {
    const { value } = e.target;
    const updatedJobRoles = program.jobRoles.map((role, i) => (i === index ? value : role));
    setProgram({ ...program, jobRoles: updatedJobRoles });
  };

  const addProgramContent = () => {
    setProgram({
      ...program,
      programContents: [...program.programContents, { SN: program.programContents.length + 1, ModuleName: '' }],
    });
  };

  const removeProgramContent = (index) => {
    const updatedProgramContents = program.programContents.filter((_, i) => i !== index);
    setProgram({ ...program, programContents: updatedProgramContents });
  };

  const addWhoShouldAttend = () => {
    setProgram({ ...program, whoShouldAttend: [...program.whoShouldAttend, ''] });
  };

  const removeWhoShouldAttend = (index) => {
    const updatedWhoShouldAttend = program.whoShouldAttend.filter((_, i) => i !== index);
    setProgram({ ...program, whoShouldAttend: updatedWhoShouldAttend });
  };

  const addAdmissionCriteria = () => {
    setProgram({ ...program, admissionCriteria: [...program.admissionCriteria, ''] });
  };

  const removeAdmissionCriteria = (index) => {
    const updatedAdmissionCriteria = program.admissionCriteria.filter((_, i) => i !== index);
    setProgram({ ...program, admissionCriteria: updatedAdmissionCriteria });
  };

  const addJobRole = () => {
    setProgram({ ...program, jobRoles: [...program.jobRoles, ''] });
  };

  const removeJobRole = (index) => {
    const updatedJobRoles = program.jobRoles.filter((_, i) => i !== index);
    setProgram({ ...program, jobRoles: updatedJobRoles });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleCertificateImageChange = (e) => {
    const file = e.target.files[0];
    setCertificateImage(file);
    setCertificateImagePreview(URL.createObjectURL(file));
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append('programName', program.programName);
    formData.append('whoShouldAttend', JSON.stringify(program.whoShouldAttend));
    formData.append('programContents', JSON.stringify(program.programContents));
    formData.append('description', program.description);
    formData.append('aboutProgram', program.aboutProgram);
    formData.append('durationOfProgram', program.durationOfProgram);
    formData.append('programAndClassSchedule', program.programAndClassSchedule);
    formData.append('jobRoles', JSON.stringify(program.jobRoles));
    formData.append('admissionCriteria', JSON.stringify(program.admissionCriteria));
    formData.append('price', program.price);
    formData.append('minAgeLimit', program.minAgeLimit);
    formData.append('maxAgeLimit', program.maxAgeLimit);
    formData.append('rating', program.rating);

    if (photo) {
      formData.append('photo', photo);
    }
    if (certificateImage) {
      formData.append('certificateImage', certificateImage);
    }

    try {
      await axios.post(
        'https://api.thelearnskills.com/api/v1/vocationalEducation/create-vocational-education',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/vocational-education');
    } catch (error) {
      console.error('Error creating program:', error);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px' }}>
      <h2>Create Program</h2>
      <TextField
        name="programName"
        label="Program Name"
        value={program.programName}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />

      <div>
        <h3>Who Should Attend</h3>
        {program.whoShouldAttend.map((attendee, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <TextField
              name={`Attendee`}
              label={`Attendee ${index + 1}`}
              value={attendee.attendee}
              onChange={(e) => handleWhoShouldAttendChange(index, e)}
              style={{ marginRight: '10px' }}
            />
            <IconButton onClick={() => removeWhoShouldAttend(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button variant="outlined" onClick={addWhoShouldAttend} startIcon={<AddIcon />}>
          Add Attendee
        </Button>
      </div>

      <div>
        <h3>Program Contents</h3>
        {program.programContents.map((content, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <TextField
              name="ModuleName"
              label={`Module ${index + 1}`}
              value={content.ModuleName}
              onChange={(e) => handleProgramContentChange(index, e)}
              style={{ marginRight: '10px' }}
            />
            <IconButton onClick={() => removeProgramContent(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button variant="outlined" onClick={addProgramContent} startIcon={<AddIcon />}>
          Add Module
        </Button>
      </div>

      <TextField
        name="description"
        label="Description"
        value={program.description}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={4}
        style={{ marginBottom: '10px' }}
      />

      <TextField
        name="aboutProgram"
        label="About Program"
        value={program.aboutProgram}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={4}
        style={{ marginBottom: '10px' }}
      />

      <TextField
        name="durationOfProgram"
        label="Duration of Program"
        value={program.durationOfProgram}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />

      <TextField
        name="programAndClassSchedule"
        label="Program and Class Schedule"
        value={program.programAndClassSchedule}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />

      <div>
        <h3>Job Roles</h3>
        {program.jobRoles.map((role, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <TextField
              name={`jobRole${index}`}
              label={`Job Role ${index + 1}`}
              value={role}
              onChange={(e) => handleJobRoleChange(index, e)}
              style={{ marginRight: '10px' }}
            />
            <IconButton onClick={() => removeJobRole(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button variant="outlined" onClick={addJobRole} startIcon={<AddIcon />}>
          Add Job Role
        </Button>
      </div>

      <div>
        <h3>Admission Criteria</h3>
        {program.admissionCriteria.map((criteria, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <TextField
              name={`admissionCriteria${index}`}
              label={`Criteria ${index + 1}`}
              value={criteria.admissionCriteria}
              onChange={(e) => handleAdmissionCriteriaChange(index, e)}
              style={{ marginRight: '10px' }}
            />
            <IconButton onClick={() => removeAdmissionCriteria(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button variant="outlined" onClick={addAdmissionCriteria} startIcon={<AddIcon />}>
          Add Admission Criteria
        </Button>
      </div>

      <TextField
        name="price"
        label="Price"
        type="number"
        value={program.price}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />

      <TextField
        name="minAgeLimit"
        label="Minimum Age Limit"
        type="number"
        value={program.minAgeLimit}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />

      <TextField
        name="maxAgeLimit"
        label="Maximum Age Limit"
        type="number"
        value={program.maxAgeLimit}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />

      <TextField
        name="rating"
        label="Rating"
        value={program.rating}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />

      <div style={{ marginBottom: '10px' }}>
        <input
          type="file"
          name="photo"
          onChange={handlePhotoChange}
          style={{ marginBottom: '10px' }}
        />
        {photoPreview && (
          <img src={photoPreview} alt="Program Photo" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
        )}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="file"
          name="certificateImage"
          onChange={handleCertificateImageChange}
          style={{ marginBottom: '10px' }}
        />
        {certificateImagePreview && (
          <img
            src={certificateImagePreview}
            alt="Certificate Preview"
            style={{ width: '100px', height: '100px', marginBottom: '10px' }}
          />
        )}
      </div>

      <Button variant="contained" onClick={handleSaveClick} color="primary">
        Save Program
      </Button>
    </div>
  );
};

export default CreateProgram;
