import React, { createContext, useContext } from 'react';

const CoursesContext = createContext();

const courses = [
  {
    id: 1,
    title: 'Supply Chain Prodigy Certificate',
    description: 'The training approach will be highly interactive taking advantage of the technological benefits.',
    price: 12999,
    image: 'https://cdn.elearningindustry.com/wp-content/uploads/2022/02/shutterstock_1112381495.jpg',
    duration: '1 months',
    rating: '⭐⭐⭐⭐',
    applicationLastDate: '10th August 2024',
    overview: 'The training approach will be highly interactive taking advantage of the technological benefits. The pedagogy followed for the programme will be a judicious blend of lectures, case studies and participants experience sharing.',
    programModules: ['Supply Chain Fundamentals',
      'Introduction to Logistics Business',
      'Warehouse Operation Management',
      'E-commerce Operations',
      'Capstone Project (21 Days OJT)'
      ],
    eligibility: ['Graduate with min 45% Marks. '],
    admissionCriteria: ['Retail applications with credentials','Final selection of participants will be based on Times Aptitude Test (TAP) followed by Interview. '],
    jobRoles: ['Warehouse Executive', 'Land Transport Executive', 'Documentation Process Executive', 'E Commerce Operation== Executive'],
    totalPrice: 12999,
    gst: 1800,
    totalPriceWithGst: 11800,
    applicationDeadlineDate: '18th May, 2024',
    programStartDate: '18th May, 2024',
    programEndDate: '31st May, 2024'
  },
  // Add more courses as needed...
];

export const CoursesProvider = ({ children }) => (
  <CoursesContext.Provider value={courses}>
    {children}
  </CoursesContext.Provider>
);

export const useCourses = () => useContext(CoursesContext);