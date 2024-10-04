import React, { createContext, useContext } from 'react';

const CoursesContext = createContext();

const courses = [
  {
    id: 1,
    title: 'Supply Chain Prodigy Certificate',
    description: 'The training approach will be highly interactive taking advantage of the technological benefits.',
    price: 'Rs.12999',
    image: '/images/SupplyChain.jpg',
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
  {
    id: 2,
    title: 'Certificate in Logistics & Warehousing Operations (CLWO)',
    description: 'This program is designed to provide comprehensive training in logistics and warehousing operations, equipping participants with the skills and knowledge needed to excel in the industry. Let me know if you need any further customization or additional details!',
    price: "Rs.",
    image: '/images/logic.jpg',
    duration: '21 Days + 1 Month OJT',
    rating: '⭐⭐⭐⭐',
    applicationLastDate: '10th August 2024',
    overview: 'The training approach will be highly interactive taking advantage of the technological benefits. The pedagogy followed for the programme will be a judicious blend of lectures, case studies and participants experience sharing.',
    programModules: ['Introduction to Logistics and Warehousing',
      'Warehouse Operations',
      'Logistics Management',
      'Technology in Warehousing',
      'Safety and Compliance',
      'Advance Excel',
      'On-the-Job Training (OJT) - 1 Month'],
    eligibility: ['Graduate with min 40% Marks. ','Upto 28years', 'Undergraduates and Postgraduates can apply'],
    admissionCriteria: ['Retail applications with credentials','Final selection of participants will be based on eligibility. ', 'PAN India'],
    jobRoles: ['Operation Executive',
'Billing Executive',
'Operation Coordinator'],
    // totalPrice: '*',
    gst: 1800,
    time: '2 Hours (Monday to Friday)',
    totalPriceWithGst: 11800,
    minAgeLimit: '20 Years',
    maxAgeLimit: '28 Years',
    programEndDate: '31st May, 2024'
  },
  {
    id: 3,
    title: 'Professional English Communication Course',
    description: 'The Professional English Communication for the Workplace course is designed to enhance your English speaking, listening, and writing skills, with a focus on real-world business scenarios. Improve your communication effectiveness and boost your career prospects.',
    image: '/images/communication.jpg',
    duration: '3 Months (12 Weeks)',
    rating: '⭐⭐⭐⭐⭐',
    price:'Rs.10,000',
    applicationLastDate: '5th December 2024',
    overview: 'Participants will engage in practical exercises, interactive sessions, and real-life case studies to improve both verbal and written communication skills, with a focus on workplace relevance.',
    programModules: [
      'Business Communication Basics',
      'Effective Workplace Conversations',
      'Email and Written Communication',
      'Presenting with Confidence',
      'Cross-Cultural Communication',
      'Negotiation and Persuasion'
    ],
    eligibility: [
      'Upto 28years',
      '10th Pass',
      'Access to a computer or smartphone with internet connection for online sessions'
    ],
    admissionCriteria: [
      'Online application form',
      'Eligibility check based on employment status and English proficiency',
      'Enrollment confirmation through email'
    ],
    jobRoles: [
      'Managers and Supervisors',
      'Customer Service Representatives',
      'Marketing and Sales Professionals',
      'Human Resources Specialists',
      'Administrative Staff',
      'Client-Facing Professionals'
    ],
    totalPrice: 12999,
    gst: 1800,
    time: '1 Hour per Day (Monday to Saturday)',
    totalPriceWithGst: 11800,
    minAgeLimit: '20 Years',
    maxAgeLimit: '60 Years',
    programEndDate: '5th March 2025'
  }
  
  // Add more courses as needed...
];

export const CoursesProvider = ({ children }) => (
  <CoursesContext.Provider value={courses}>
    {children}
  </CoursesContext.Provider>
);

export const useCourses = () => useContext(CoursesContext);
