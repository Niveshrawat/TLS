import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VideoResumeModal = ({ isOpen, onClose, onApply }) => {
  const [video, setVideo] = useState(null);
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.name === 'video') {
      setVideo(e.target.files[0]);
    } else if (e.target.name === 'resume') {
      setResume(e.target.files[0]);
    }
  };

  

  const handleSubmit = () => {
    if (video && resume) {
      onApply(video, resume);
    } else {
      toast.error("Both video and resume files are required.");
    }
  };


  const handleUploadClick = (fieldName) => {
    document.getElementById(`${fieldName}-upload-input`).click();
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={{
          p: 4,
          width: '400px',
          margin: 'auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          textAlign: 'center'
        }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upload Your Video and Resume
          </Typography>

          {/* Hidden file inputs */}
          <input
            id="video-upload-input"
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            name="video"
            style={{ display: 'none' }}
          />
          <input
            id="resume-upload-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            name="resume"
            style={{ display: 'none' }}
          />

          {/* Custom upload buttons */}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUploadClick('video')}
            fullWidth
            sx={{
              mb: 2,
              p: 1.5,
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#d0d0d0',
              },
              fontWeight: 'bold'
            }}
          >
            Choose Video File
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUploadClick('resume')}
            fullWidth
            sx={{
              mb: 2,
              p: 1.5,
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#d0d0d0',
              },
              fontWeight: 'bold'
            }}
          >
            Choose Resume File
          </Button>

          {video && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              Selected video: {video.name}
            </Typography>
          )}

          {resume && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Selected resume: {resume.name}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ p: 1.5 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default VideoResumeModal;
