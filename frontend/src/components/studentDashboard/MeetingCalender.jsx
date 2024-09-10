import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog,Typography, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('https://api.thelearnskills.com/api/v1/meeting/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const meetings = response.data.meetings.map(meeting => ({
        start: new Date(meeting.date),
        end: new Date(meeting.date), // Adjust if there's a specific end time
        title: meeting.title,
        description: meeting.description,
        meetingLink: meeting.meetingLink,
        createdBy: meeting.createdBy.name,
      }));

      setEvents(meetings);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <div style={{marginTop:'4rem'}}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />
      {selectedEvent && (
        <TaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          event={selectedEvent}
          onSave={updatedEvent => {
            setEvents(events.map(ev => ev === selectedEvent ? updatedEvent : ev));
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

const TaskModal = ({ open, onClose, event, onSave }) => {
  const [title, setTitle] = useState(event.title);

  const handleSave = () => {
    onSave({ ...event, title });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{event.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1"><strong>Description:</strong> {event.description}</Typography>
        <Typography variant="body1"><strong>Meeting Link:</strong> <a href={event.meetingLink} target="_blank" rel="noopener noreferrer">{event.meetingLink}</a></Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyCalendar;
