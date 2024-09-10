import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'video') {
      cb(null, './uploads/videos');
    } else if (file.fieldname === 'resume') {
      cb(null, './uploads/resumes'); // Ensure this directory exists or create it
    } else {
      cb(new Error('Error: Invalid file type!'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Check file type
const checkFileType = (file, cb) => {
  const validVideoExtensions = /mp4|avi|mov|mkv/;
  const validResumeExtensions = /pdf|doc|docx/;
  
  if (file.fieldname === 'video') {
    const extname = validVideoExtensions.test(path.extname(file.originalname).toLowerCase());
    cb(null, extname);
  } else if (file.fieldname === 'resume') {
    const extname = validResumeExtensions.test(path.extname(file.originalname).toLowerCase());
    cb(null, extname);
  } else {
    cb(new Error('Error: Invalid file type!'));
  }
};

// Init upload
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB file size limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

export default upload;
