import React, { createContext, useContext } from 'react';

const CoursesContext = createContext();

const courses = [
  {
    id: 1,
    title: 'Supply Chain Prodigy Certificate',
    description: 'The training approach will be highly interactive taking advantage of the technological benefits.',
    price: 12999,
    image: '/public/images/SupplyChain.jpg',
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
    eligibility: ['Graduate with min 45% Marks. ','Upto 28years', 'Undergraduates and Postgraduates can apply'],
    admissionCriteria: ['Retail applications with credentials','Final selection of participants will be based on eligibility. ', 'PAN India'],
    jobRoles: ['Warehouse Executive', 'Land Transport Executive', 'Documentation Process Executive', 'E Commerce Operation== Executive'],
    totalPrice: 12999,
    gst: 1800,
    time: '10:00 AM to 1:00 PM',
    totalPriceWithGst: 11800,
    minAgeLimit: '20 Years',
    maxAgeLimit: '28 Years',
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
