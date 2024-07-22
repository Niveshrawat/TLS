// const express =require('express')
import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js';
import morgan from 'morgan';
import session from 'express-session';

import authRoutes from './routes/authRoutes.js'
import ugRoutes from './routes/ugRoutes.js'
import pgRoutes from './routes/pgRoutes.js';
import shortTermCertificateRoutes from './routes/shortTermCertificateRoutes.js';
import longTermCertificateRoutes from './routes/longTermCertificateRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import industrialWorkshopRoutes from './routes/industrialWorkshopRoutes.js';
import universityPartnershipRoutes from './routes/universityPartnershipRoutes.js';
import industrialCertificateRoutes from './routes/industrialCertificateRoutes.js';
import corporateCertificateRoutes from './routes/corporateCertificateRoutes.js';
import jobSupportProgramRoutes from './routes/jobSupportProgramRoutes.js';
import shortTermCourseRoutes from './routes/shortTermCourseRoutes.js';
import longTermCourseRoutes from './routes/longTermCourseRoutes.js';
import collegeRoutes from './routes/collegeRoutes.js';
import cors from 'cors'


//configure env
dotenv.config()

//connecting database
ConnectDB();

//rest object
const app=express()

var corsOptions = {
  origin:true,
  optionsSuccessStatus: 200 // For legacy browser support
  }
  
  app.use(cors(corsOptions)); 



app.use(express.json())
app.use(morgan('dev'))


//All routes
app.use('/api/v1/auth',authRoutes)
// Education
app.use('/api/v1/ug',ugRoutes)
app.use('/api/v1/pg',pgRoutes)
app.use('/api/v1/sc', shortTermCertificateRoutes);
app.use('/api/v1/lc', longTermCertificateRoutes);
app.use('/api/v1/intern', internshipRoutes);
app.use('/api/v1/industry', industrialWorkshopRoutes);
app.use('/api/v1/university', universityPartnershipRoutes);
// Vocational Education
app.use('/api/v1/industryCertificate', industrialCertificateRoutes);
app.use('/api/v1/corporateCertificate', corporateCertificateRoutes);
// Corporate Connect
app.use('/api/v1/jobSupport', jobSupportProgramRoutes);

// CRUD operations for Courses
app.use('/api/v1/shortTermcourse', shortTermCourseRoutes);
app.use('/api/v1/longTermcourse', longTermCourseRoutes);

// CRUD operations for Courses
app.use('/api/v1/college', collegeRoutes);


app.get('/',(req,res)=>{
    res.send({
        message:'Welcome'
    })
})
const Port=process.env.Port
app.listen(Port,()=>{
    console.log('Server is running')
})