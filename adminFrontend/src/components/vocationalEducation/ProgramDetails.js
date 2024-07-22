// src/ProgramDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const ProgramDetailPage = () => {
  const { _id } = useParams();
  const [program, setProgram] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProgram, setEditedProgram] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token')); // Retrieve token from local storage
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/vocationalEducation/vocational-education/${_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProgram(response.data);
        setEditedProgram(response.data); // Initialize editedProgram with fetched data
      } catch (error) {
        console.error('Error fetching program:', error);
      }
    };

    fetchProgram();
  }, [_id, token]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
  
    // Append each field to formData
    formData.append('programName', editedProgram.programName);
    formData.append('whoShouldAttend', editedProgram.whoShouldAttend);
    formData.append('programContents', JSON.stringify(editedProgram.programContents)); // JSON.stringify if it's an array
    formData.append('aboutProgram', editedProgram.aboutProgram);
    formData.append('durationOfProgram', editedProgram.durationOfProgram);
    formData.append('programAndClassSchedule', editedProgram.programAndClassSchedule);
    formData.append('jobRoles', JSON.stringify(editedProgram.jobRoles)); // JSON.stringify if it's an array
    formData.append('admissionCriteria', editedProgram.admissionCriteria);
    formData.append('minAgeLimit', editedProgram.minAgeLimit);
    formData.append('maxAgeLimit', editedProgram.maxAgeLimit);
    formData.append('attendanceCriteria', editedProgram.attendanceCriteria);

    // Append file if any
    if (editedProgram.photo) {
      formData.append('photo', editedProgram.photo);
    }
  
    try {
      await axios.put(`http://localhost:8080/api/v1/vocationalEducation/vocational-education/${_id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProgram(editedProgram);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProgram({
      ...editedProgram,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedProgram({
      ...editedProgram,
      photo: file,
    });
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleProgramContentChange = (index, e) => {
    const updatedProgramContents = [...editedProgram.programContents];
    updatedProgramContents[index][e.target.name] = e.target.value;
    setEditedProgram({ ...editedProgram, programContents: updatedProgramContents });
  };

  if (!program) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px' }}>
      <h2>{program.programName}</h2>
      {editMode ? (
        <>
          <TextField
            name="programName"
            label="Program Name"
            value={editedProgram.programName}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            name="whoShouldAttend"
            label="Who Should Attend"
            value={editedProgram.whoShouldAttend}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          {editedProgram.programContents.map((content, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <TextField
                name="SN"
                label="SN"
                value={content.SN}
                onChange={(e) => handleProgramContentChange(index, e)}
                style={{ marginRight: '10px' }}
              />
              <TextField
                name="ModuleName"
                label="Module Name"
                value={content.ModuleName}
                onChange={(e) => handleProgramContentChange(index, e)}
              />
            </div>
          ))}
          <TextField
            name="aboutProgram"
            label="About Program"
            value={editedProgram.aboutProgram}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            name="durationOfProgram"
            label="Duration of Program"
            value={editedProgram.durationOfProgram}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            name="programAndClassSchedule"
            label="Timing"
            value={editedProgram.programAndClassSchedule}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          {editedProgram.jobRoles.map((role, index) => (
            <TextField
              key={index}
              name={`jobRole${index}`}
              label={`Job Role ${index + 1}`}
              value={role}
              onChange={(e) => {
                const updatedJobRoles = [...editedProgram.jobRoles];
                updatedJobRoles[index] = e.target.value;
                setEditedProgram({ ...editedProgram, jobRoles: updatedJobRoles });
              }}
              fullWidth
              style={{ marginBottom: '10px' }}
            />
          ))}
          <TextField
            name="admissionCriteria"
            label="Admission Criteria"
            value={editedProgram.admissionCriteria}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            name="minAgeLimit"
            label="Minimum Age"
            value={editedProgram.minAgeLimit}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            name="maxAgeLimit"
            label="Maximum Age"
            value={editedProgram.maxAgeLimit}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            name="attendanceCriteria"
            label="Attendance Criteria"
            value={editedProgram.attendanceCriteria}
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
          <Button variant="outlined" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <p><strong>Program Name:</strong> {program.programName}</p>
          <p><strong>Who Should Attend:</strong> {program.whoShouldAttend}</p>
          <p><strong>Program Contents:</strong></p>
          <ul>
            {program.programContents.map((content, index) => (
              <li key={index}>
                {content.SN}. {content.ModuleName}
              </li>
            ))}
          </ul>
          <p><strong>About Program:</strong> {program.aboutProgram}</p>
          <p><strong>Duration of Program:</strong> {program.durationOfProgram}</p>
          <p><strong>Schedule:</strong> {program.programAndClassSchedule}</p>
          <p><strong>Job Roles:</strong></p>
          <ul>
            {program.jobRoles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
          <p><strong>Admission Criteria:</strong> {program.admissionCriteria}</p>
          <p><strong>Minimum Age:</strong> {program.minAgeLimit}</p>
          <p><strong>Maximum Age:</strong> {program.maxAgeLimit}</p>
          <p><strong>Attendance Criteria:</strong> {program.attendanceCriteria}</p>
          <img src={`http://localhost:8080/${program.photo}`} alt="Program" width="100" height="100" />

<div marginTop="2rem">
          <Button variant="outlined" onClick={handleEditClick} >
            Edit
          </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProgramDetailPage;
