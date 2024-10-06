import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ProgramDetailPage = () => {
  const { _id } = useParams();
  const [program, setProgram] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProgram, setEditedProgram] = useState({});
  const [token] = useState(localStorage.getItem('token'));
  const [photoPreview, setPhotoPreview] = useState(null);
  const [certificateImagePreview, setCertificateImagePreview] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get(
          `https://api.thelearnskills.com/api/v1/vocationalEducation/vocational-education/${_id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProgram(response.data);
        setEditedProgram(response.data);

        if (response.data.photo) {
          setPhotoPreview(response.data.photo);
        }
        if (response.data.certificateImage) {
          setCertificateImagePreview(response.data.certificateImage);
        }
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

    formData.append('programName', editedProgram.programName);
    formData.append('whoShouldAttend', JSON.stringify(editedProgram.whoShouldAttend));
    formData.append('programContents', JSON.stringify(editedProgram.programContents));
    formData.append('description', editedProgram.description);
    formData.append('aboutProgram', editedProgram.aboutProgram);
    formData.append('durationOfProgram', editedProgram.durationOfProgram);
    formData.append('programAndClassSchedule', editedProgram.programAndClassSchedule);
    formData.append('jobRoles', JSON.stringify(editedProgram.jobRoles));
    formData.append('admissionCriteria', JSON.stringify(editedProgram.admissionCriteria));
    formData.append('Price', editedProgram.Price);
    formData.append('minAgeLimit', editedProgram.minAgeLimit);
    formData.append('maxAgeLimit', editedProgram.maxAgeLimit);
    formData.append('rating', editedProgram.rating || '');

    if (editedProgram.photo instanceof File) {
      formData.append('photo', editedProgram.photo);
    }

    if (editedProgram.certificateImage instanceof File) {
      formData.append('certificateImage', editedProgram.certificateImage);
    }

    try {
      await axios.put(
        `https://api.thelearnskills.com/api/v1/vocationalEducation/vocational-education/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
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

  const handleProgramContentChange = (index, e) => {
    const updatedProgramContents = [...editedProgram.programContents];
    updatedProgramContents[index][e.target.name] = e.target.value;
    setEditedProgram({ ...editedProgram, programContents: updatedProgramContents });
  };

  const handleJobRoleChange = (index, e) => {
    const updatedJobRoles = [...editedProgram.jobRoles];
    updatedJobRoles[index] = e.target.value;
    setEditedProgram({ ...editedProgram, jobRoles: updatedJobRoles });
  };

  const handleWhoShouldAttendChange = (index, e) => {
    const updatedWhoShouldAttend = [...editedProgram.whoShouldAttend];
    updatedWhoShouldAttend[index] = e.target.value;
    setEditedProgram({ ...editedProgram, whoShouldAttend: updatedWhoShouldAttend });
  };

  const handleAdmissionCriteriaChange = (index, e) => {
    const updatedAdmissionCriteria = [...editedProgram.admissionCriteria];
    updatedAdmissionCriteria[index] = e.target.value;
    setEditedProgram({ ...editedProgram, admissionCriteria: updatedAdmissionCriteria });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedProgram({
      ...editedProgram,
      photo: file,
    });
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleCertificateImageChange = (e) => {
    const file = e.target.files[0];
    setEditedProgram({
      ...editedProgram,
      certificateImage: file,
    });
    setCertificateImagePreview(URL.createObjectURL(file));
  };

  const addProgramContent = () => {
    setEditedProgram({
      ...editedProgram,
      programContents: [...editedProgram.programContents, { SN: editedProgram.programContents.length + 1, ModuleName: '' }],
    });
  };

  const removeProgramContent = (index) => {
    const updatedProgramContents = editedProgram.programContents.filter((_, i) => i !== index);
    setEditedProgram({ ...editedProgram, programContents: updatedProgramContents });
  };

  const addWhoShouldAttend = () => {
    setEditedProgram({
      ...editedProgram,
      whoShouldAttend: [...editedProgram.whoShouldAttend, ''],
    });
  };

  const removeWhoShouldAttend = (index) => {
    const updatedWhoShouldAttend = editedProgram.whoShouldAttend.filter((_, i) => i !== index);
    setEditedProgram({ ...editedProgram, whoShouldAttend: updatedWhoShouldAttend });
  };

  const addAdmissionCriteria = () => {
    setEditedProgram({
      ...editedProgram,
      admissionCriteria: [...editedProgram.admissionCriteria, ''],
    });
  };

  const removeAdmissionCriteria = (index) => {
    const updatedAdmissionCriteria = editedProgram.admissionCriteria.filter((_, i) => i !== index);
    setEditedProgram({ ...editedProgram, admissionCriteria: updatedAdmissionCriteria });
  };

  const addJobRole = () => {
    setEditedProgram({
      ...editedProgram,
      jobRoles: [...editedProgram.jobRoles, ''],
    });
  };

  const removeJobRole = (index) => {
    const updatedJobRoles = editedProgram.jobRoles.filter((_, i) => i !== index);
    setEditedProgram({ ...editedProgram, jobRoles: updatedJobRoles });
  };

  if (!program) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px', marginTop:"5rem" }}>
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
          <div>
            <h3>Who Should Attend</h3>
            {editedProgram.whoShouldAttend.map((attendee, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                  name="Who Should Attend"
                  label={`Attendee ${index + 1}`}
                  value={attendee.whoShouldAttend}
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
            {editedProgram.programContents.map((content, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                  name="SN"
                  label="SN"
                  type="number"
                  value={content.SN}
                  onChange={(e) => handleProgramContentChange(index, e)}
                  style={{ marginRight: '10px' }}
                />
                <TextField
                  name="ModuleName"
                  label={`Module ${index + 1}`}
                  value={content.ModuleName}
                  onChange={(e) => handleProgramContentChange(index, e)}
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
            value={editedProgram.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: '10px' }}
          />

          <TextField
            name="aboutProgram"
            label="About Program"
            value={editedProgram.aboutProgram}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
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
            label="Schedule"
            value={editedProgram.programAndClassSchedule}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <div>
            <h3>Job Roles</h3>
            {editedProgram.jobRoles.map((role, index) => (
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
            {editedProgram.admissionCriteria.map((criteria, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                  name={`admissionCriteria${index}`}
                  label={`Criteria ${index + 1}`}
                  value={criteria}
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
            value={editedProgram.price}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            name="minAgeLimit"
            label="Minimum Age"
            type="number"
            value={editedProgram.minAgeLimit}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            name="maxAgeLimit"
            label="Maximum Age"
            type="number"
            value={editedProgram.maxAgeLimit}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            name="rating"
            label="Rating"
            value={editedProgram.rating || ''}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />

          <div style={{ marginBottom: '10px' }}>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              style={{ marginBottom: '10px' }}
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                style={{ width: '100px', height: '100px', marginRight: '5px' }}
              />
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
                style={{ width: '100px', height: '100px', marginRight: '5px' }}
              />
            )}
          </div>

          <Button variant="contained" color="primary" onClick={handleSaveClick} style={{ marginRight: '10px' }}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <p>
            <strong>Program Name:</strong> {program.programName}
          </p>
          <p>
  <strong>Who Should Attend:</strong>
  <ul>
    {program.whoShouldAttend.map((attendee, index) => (
      <li key={index}>{attendee}</li>
    ))}
  </ul>
</p>

          <p>
            <strong>Program Contents:</strong>
          </p>
          <ul>
            {program.programContents.map((content, index) => (
              <li key={index}>
                {content.SN}. {content.ModuleName}
              </li>
            ))}
          </ul>
          <p>
            <strong>Description:</strong> {program.description}
          </p>
          <p>
            <strong>About Program:</strong> {program.aboutProgram}
          </p>
          <p>
            <strong>Duration of Program:</strong> {program.durationOfProgram}
          </p>
          <p>
            <strong>Program and Class Schedule:</strong> {program.programAndClassSchedule}
          </p>
          <p>
            <strong>Job Roles:</strong>
            <ul>
              {program.jobRoles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </p>
          <p>
  <strong>Admission Criteria:</strong>
  <ul>
    {program.admissionCriteria.map((criteria, index) => (
      <li key={index}>{criteria}</li>
    ))}
  </ul>
</p>
          <p>
            <strong>Price:</strong> {program.price}
          </p>
          <p>
            <strong>Minimum Age Limit:</strong> {program.minAgeLimit}
          </p>
          <p>
            <strong>Maximum Age Limit:</strong> {program.maxAgeLimit}
          </p>
          <p>
            <strong>Rating:</strong> {program.rating}
          </p>
          <p>
            <strong>Certificate Image:</strong>
          </p>
          {program.certificateImage && (
            <img
              src={`https://api.thelearnskills.com/${program.certificateImage}`}
              alt="Certificate"
              style={{ width: '100px', height: '100px', marginRight: '5px' }}
            />
          )}
          <p>
            <strong>Photo:</strong>
          </p>
          {program.photo && (
            <img
              src={`https://api.thelearnskills.com/${program.photo}`}
              alt="Program"
              style={{ width: '100px', height: '100px', marginRight: '5px' }}
            />
          )}
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </>
      )}
    </div>
  );
};

export default ProgramDetailPage;
