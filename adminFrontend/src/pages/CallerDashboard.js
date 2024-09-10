import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const statusColors = {
  Enquiry: 'grey',
  Enc: 'blue',
  Cold: 'lightblue',
  Dead: 'black',
  Connected: 'green',
  Warm: 'orange',
  Hot: 'red',
  Register: 'purple',
  Enroll: 'pink' 
};

const Dashboard = () => {
  const [courseLeads, setCourseLeads] = useState([]);
  const [role, setRole] = useState('');
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState(dayjs());

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    const apiEndpoint = storedRole === 'caller'
      ? 'https://api.thelearnskills.com/api/v1/sc/caller-leads'
      : 'https://api.thelearnskills.com/api/v1/sc/short-term-certificates';

    fetch(apiEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setCourseLeads(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US');

  // Filter leads by date range
  const filteredLeads = courseLeads.filter(lead => {
    const leadDate = dayjs(lead.date);
    return leadDate.isAfter(startDate) && leadDate.isBefore(endDate.add(1, 'day'));
  });

  // Group leads by date and status
  const leadsByDateAndStatus = filteredLeads.reduce((acc, lead) => {
    const date = formatDate(lead.date);
    if (!acc[date]) acc[date] = {};
    if (!acc[date][lead.status]) acc[date][lead.status] = 0;
    acc[date][lead.status]++;
    return acc;
  }, {});

  // Prepare data for the first bar chart
  const leadData = Object.keys(leadsByDateAndStatus).map(date => ({
    date,
    ...leadsByDateAndStatus[date]
  }));

  // Count leads by status
  const statusCounts = filteredLeads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the second bar chart
  const statusData = Object.keys(statusCounts).map(status => ({
    status,
    count: statusCounts[status],
    color: statusColors[status]
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Typography variant="h5" fontWeight="bold">Caller Dashboard</Typography>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <DatePicker 
            label="Start Date" 
            value={startDate} 
            onChange={(newValue) => setStartDate(newValue)} 
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker 
            label="End Date" 
            value={endDate} 
            onChange={(newValue) => setEndDate(newValue)} 
            renderInput={(params) => <TextField {...params} />}
          />
          <Button variant="contained" color="primary" onClick={() => setEndDate(endDate)}>Filter</Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '40px' }}>
            <Typography variant="h6">Leads Over the Selected Date Range</Typography>
            <BarChart
              width={800}
              height={400}
              data={leadData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(statusColors).map(status => (
                <Bar key={status} dataKey={status} stackId="a" fill={statusColors[status]} />
              ))}
            </BarChart>
          </div>
          <div>
            <Typography variant="h6">Lead Status Distribution</Typography>
            <BarChart
              width={800}
              height={400}
              data={statusData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d">
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Dashboard;
