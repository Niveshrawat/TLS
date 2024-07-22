import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateProgram = () => {
  const [program, setProgram] = useState({
    programName: '',
    whoShouldAttend: '',
    programContents: [{ SN: 1, ModuleName: '' }],
    aboutProgram: '',
    durationOfProgram: '',
    programAndClassSchedule: '',
    jobRoles: [''],
    admissionCriteria: '',
    minAgeLimit: '',
    maxAgeLimit: '',
    attendanceCriteria: '',
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
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

  const addJobRole = () => {
    setProgram({ ...program, jobRoles: [...program.jobRoles, ''] });
  };

  const removeJobRole = (index) => {
    const updatedJobRoles = program.jobRoles.filter((_, i) => i !== index);
    setProgram({ ...program, jobRoles: updatedJobRoles });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append('programName', program.programName);
    formData.append('whoShouldAttend', program.whoShouldAttend);
    formData.append('programContents', JSON.stringify(program.programContents));
    formData.append('aboutProgram', program.aboutProgram);
    formData.append('durationOfProgram', program.durationOfProgram);
    formData.append('programAndClassSchedule', program.programAndClassSchedule);
    formData.append('jobRoles', JSON.stringify(program.jobRoles));
    formData.append('admissionCriteria', program.admissionCriteria);
    formData.append('minAgeLimit', program.minAgeLimit);
    formData.append('maxAgeLimit', program.maxAgeLimit);
    formData.append('attendanceCriteria', program.attendanceCriteria);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      await axios.post('https://api.thelearnskills.com/api/v1/vocationalEducation/create-vocational-education', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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
      <TextField
        name="whoShouldAttend"
        label="Who Should Attend"
        value={program.whoShouldAttend}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
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
        name="aboutProgram"
        label="About Program"
        value={program.aboutProgram}
        onChange={handleInputChange}
        fullWidth
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
        label="Timing"
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
      <TextField
        name="admissionCriteria"
        label="Admission Criteria"
        value={program.admissionCriteria}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <TextField
        name="minAgeLimit"
        label="Minimum Age"
        type="number"
        value={program.minAgeLimit}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <TextField
        name="maxAgeLimit"
        label="Maximum Age"
        type="number"
        value={program.maxAgeLimit}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <TextField
        name="attendanceCriteria"
        label="Attendance Criteria"
        value={program.attendanceCriteria}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <input
        type="file"
        name="photo"
        onChange={handleFileChange}
        style={{ marginBottom: '10px' }}
      />
      {photoPreview && (
        <img
          src={photoPreview}
          alt="Program"
          width="100"
          height="100"
          style={{ marginBottom: '10px' }}
        />
      )}
      <Button variant="contained" color="primary" onClick={handleSaveClick} style={{ marginRight: '10px' }}>
        Save
      </Button>
      <Button variant="outlined" onClick={() => navigate('/vocational-education')}>
        Cancel
      </Button>
    </div>
  );
};

export default CreateProgram;
