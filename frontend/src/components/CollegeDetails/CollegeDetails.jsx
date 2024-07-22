import React, { useRef } from 'react';
import { Box, Container, AppBar, Tabs, Tab, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import CollegeDetailsBanner from './CollegeDetailBanner';
import CollegeInfo from './CollegeInfo';
import CoursesTable from './CourseTable';
import Reviews from './Review';
import AdmissionProcess from './AdmissionProcess';
import PlacementTable from './PlacementProcess';
import CollegeRankingPage from './CollegeRanking'; // Import CollegeRankingPage
import Navbar from '../header/Navbar';

// Sample data for demonstration purposes
const sampleCollegesData = [
  {
    id: 1,
    name: 'Demo 1, Admissions 2024,Courses, Fees, Placements, Ranking',
    loaction:'Noida',
    rating:'⭐⭐⭐⭐',
    nirfRank:'',
    image: 'https://images.livemint.com/img/2021/07/29/600x338/b5af6ee0-ed4d-11eb-a043-f8aaa01a1d1e_1627242083337_1627556687642.jpg',
    description: 'A premier institution offering various undergraduate courses.',
    overview: 'Demo 1 is a state-level, public collegiate university that was established in 2000. Formerly known as Uttar Pradesh Technical University (UPTU) is a ‘University of National Importance’, specially for the UG and PG courses offered in the field of Engineering and Science. AKTU is recognised by the University Grants Commission (UGC) and is also a member of the Association of Indian Universities (AIU). Presently, the university houses six constituent faculties/ institutions, including the Institute of Engineering and Technology, Faculty of Architecture Lucknow, Centre for Advanced Studies, Faculty of Management Studies, Faculty of Pharmacy, and UP Institute of Design Noida.',
    about: "AKTU offers a wide variety of over 76 courses at undergraduate, postgraduate, and other levels. Admission to AKTU is based on either entrance exams, merit, or a combination of both, depending on the course. The university accepts scores from various entrance exams, including JEE Main, GATE, and CUET, for different courses. The table below shows a list of AKTU courses along with their eligibility criteria and fees:",
    courses: [
      { name: 'B.Tech', fees: '10000', eligibility: '10+2 with PCM' },
      { name: 'B.Sc', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'M.Tech', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'BCA', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'M.Pharma', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'BBA', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'B.Arch', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'BFA', fees: '8000', eligibility: '10+2 with Science' },
    ],
    reviews: [
      { content: 'Great college with excellent faculty.', author: 'John Doe' },
      { content: 'Amazing infrastructure and placement support.', author: 'Jane Smith' },
    ],
    admissionProcess: 'The course admissions 2024 are open for various programmes offered at the undergraduate and postgraduate levels. The courses are offered in various areas of study such as Engineering, Management, Science, etc. IIT Madras admission is completely entrance-based for BTech, MTech, MSc and BSc courses. IIT Madras admission to most of the courses is done through national-level entrance exams including JEE Main/ JEE Advanced, IIT JAM and GATE, among others. Candidates seeking admission to IIT Madras courses must visit the official website of these entrance exams to apply online. Read on to learn more about IIT Madras admission 2024.',
    admissionOngoing: 'Admissions are currently open.',
    placements: [
      { company: 'Google', package: '12 LPA' },
      { company: 'Microsoft', package: '10 LPA' },
    ],
  },
  {
    id: 2,
    name: 'Demo 2, Admissions 2024,Courses, Fees, Placements, Ranking',
    location:'Mumbai',
    rating:'⭐⭐⭐⭐',
    image: 'https://images.livemint.com/img/2021/07/29/600x338/b5af6ee0-ed4d-11eb-a043-f8aaa01a1d1e_1627242083337_1627556687642.jpg',
    description: 'A premier institution offering various undergraduate courses.',
    overview: 'Demo 2 is a state-level, public collegiate university that was established in 2000. Formerly known as Uttar Pradesh Technical University (UPTU) is a ‘University of National Importance’, specially for the UG and PG courses offered in the field of Engineering and Science. AKTU is recognised by the University Grants Commission (UGC) and is also a member of the Association of Indian Universities (AIU). Presently, the university houses six constituent faculties/ institutions, including the Institute of Engineering and Technology, Faculty of Architecture Lucknow, Centre for Advanced Studies, Faculty of Management Studies, Faculty of Pharmacy, and UP Institute of Design Noida.',
    about: "AKTU offers a wide variety of over 76 courses at undergraduate, postgraduate, and other levels. Admission to AKTU is based on either entrance exams, merit, or a combination of both, depending on the course. The university accepts scores from various entrance exams, including JEE Main, GATE, and CUET, for different courses. The table below shows a list of AKTU courses along with their eligibility criteria and fees:",
    courses: [
      { name: 'B.Tech', fees: '10000', eligibility: '10+2 with PCM' },
      { name: 'B.Sc', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'M.Tech', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'BCA', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'M.Pharma', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'BBA', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'B.Arch', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'BFA', fees: '8000', eligibility: '10+2 with Science' },
    ],
    reviews: [
      { content: 'Great college with excellent faculty.', author: 'John Doe' },
      { content: 'Amazing infrastructure and placement support.', author: 'Jane Smith' },
    ],
    admissionProcess: 'The course admissions 2024 are open for various programmes offered at the undergraduate and postgraduate levels. The courses are offered in various areas of study such as Engineering, Management, Science, etc. IIT Madras admission is completely entrance-based for BTech, MTech, MSc and BSc courses. IIT Madras admission to most of the courses is done through national-level entrance exams including JEE Main/ JEE Advanced, IIT JAM and GATE, among others. Candidates seeking admission to IIT Madras courses must visit the official website of these entrance exams to apply online. Read on to learn more about IIT Madras admission 2024.',
    admissionOngoing: 'Admissions are currently open.',
    placements: [
      { company: 'Google', package: '12 LPA' },
      { company: 'Microsoft', package: '10 LPA' },
    ],
  },
  {
    id: 3,
    name: 'Demo 3, Admissions 2024,Courses, Fees, Placements, Ranking',
    location:'Mumbai',
    rating:'⭐⭐⭐⭐',
    image: 'https://images.livemint.com/img/2021/07/29/600x338/b5af6ee0-ed4d-11eb-a043-f8aaa01a1d1e_1627242083337_1627556687642.jpg',
    description: 'A premier institution offering various undergraduate courses.',
    overview: 'Demo 3 is a state-level, public collegiate university that was established in 2000. Formerly known as Uttar Pradesh Technical University (UPTU) is a ‘University of National Importance’, specially for the UG and PG courses offered in the field of Engineering and Science. AKTU is recognised by the University Grants Commission (UGC) and is also a member of the Association of Indian Universities (AIU). Presently, the university houses six constituent faculties/ institutions, including the Institute of Engineering and Technology, Faculty of Architecture Lucknow, Centre for Advanced Studies, Faculty of Management Studies, Faculty of Pharmacy, and UP Institute of Design Noida.',
    about: "AKTU offers a wide variety of over 76 courses at undergraduate, postgraduate, and other levels. Admission to AKTU is based on either entrance exams, merit, or a combination of both, depending on the course. The university accepts scores from various entrance exams, including JEE Main, GATE, and CUET, for different courses. The table below shows a list of AKTU courses along with their eligibility criteria and fees:",
    courses: [
      { name: 'B.Tech', fees: '10000', eligibility: '10+2 with PCM' },
      { name: 'B.Sc', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'M.Tech', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'BCA', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'M.Pharma', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'BBA', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'B.Arch', fees: '8000', eligibility: '10+2 with Science' },
      { name: 'BFA', fees: '8000', eligibility: '10+2 with Science' },
    ],
    reviews: [
      { content: 'Great college with excellent faculty.', author: 'John Doe' },
      { content: 'Amazing infrastructure and placement support.', author: 'Jane Smith' },
    ],
    admissionProcess: 'The course admissions 2024 are open for various programmes offered at the undergraduate and postgraduate levels. The courses are offered in various areas of study such as Engineering, Management, Science, etc. IIT Madras admission is completely entrance-based for BTech, MTech, MSc and BSc courses. IIT Madras admission to most of the courses is done through national-level entrance exams including JEE Main/ JEE Advanced, IIT JAM and GATE, among others. Candidates seeking admission to IIT Madras courses must visit the official website of these entrance exams to apply online. Read on to learn more about IIT Madras admission 2024.',
    admissionOngoing: 'Admissions are currently open.',
    placements: [
      { company: 'Google', package: '12 LPA' },
      { company: 'Microsoft', package: '10 LPA' },
    ],
  },
  // Add other colleges as needed
];

const CollegeDetailsPage = () => {
  const { id } = useParams();
  const college = sampleCollegesData.find(c => c.id === parseInt(id));

  const [value, setValue] = React.useState(0);

  const sectionsRefs = {
    0: useRef(null),
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    sectionsRefs[newValue].current.scrollIntoView({ behavior: 'smooth' });
  };

  if (!college) {
    return <Typography variant="h4" gutterBottom>College not found</Typography>;
  }

  return (
    <Box>
      <Navbar />
      <Container>
        <CollegeDetailsBanner college={college} />
        <AppBar position="static" sx={{ backgroundColor: 'navy' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" textColor="inherit">
            <Tab label="College Info" />
            <Tab label="Courses" />
            <Tab label="Reviews" />
            <Tab label="Ranking" />
            <Tab label="Admission" />
            <Tab label="Placement" />
          </Tabs>
        </AppBar>
        <Box>
          <div ref={sectionsRefs[0]}>
            <CollegeInfo overview={college.overview} />
          </div>
          <div ref={sectionsRefs[1]}>
            <CoursesTable courses={college.courses} overview={college.about} />
          </div>
          <div ref={sectionsRefs[2]}>
            <Reviews reviews={college.reviews} />
          </div>
          <div ref={sectionsRefs[3]} marginBottom="4rem">
            <CollegeRankingPage />
          </div>
          <div ref={sectionsRefs[4]}>
            <AdmissionProcess process={college.admissionProcess} ongoing={college.admissionOngoing} />
          </div>
          <div ref={sectionsRefs[5]}>
            <PlacementTable placements={college.placements} />
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default CollegeDetailsPage;
