import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get('https://api.thelearnskills.com/api/v1/meeting/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const meetings = response.data.meetings.map(meeting => ({
        id: meeting._id,
        start: moment(meeting.date).toDate(),
        end: moment(meeting.date).toDate(),
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

  const handleCreateMeeting = async (meeting) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      await axios.post('https://api.thelearnskills.com/api/v1/meeting/create', meeting, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      fetchMeetings(); // Refresh the calendar with new meeting
      setCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  return (
    <div style={{ marginTop: '4rem' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateModalOpen(true)}
        style={{ marginBottom: '1rem' }}
      >
        Create Meeting
      </Button>
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
            setEvents(events.map(ev => ev.id === selectedEvent.id ? updatedEvent : ev));
            setModalOpen(false);
          }}
        />
      )}
      <CreateMeetingModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateMeeting}
      />
    </div>
  );
};

const TaskModal = ({ open, onClose, event, onSave }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [meetingLink, setMeetingLink] = useState(event.meetingLink);
  const [date, setDate] = useState(moment(event.start));

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const updatedEvent = {
        title,
        description,
        meetingLink,
        date: date.toISOString(),
      };

      await axios.put(`https://api.thelearnskills.com/api/v1/meeting/${event.id}`, updatedEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      onSave({ ...event, ...updatedEvent });
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this meeting?');
    if (confirmed) {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        await axios.delete(`https://api.thelearnskills.com/api/v1/meeting/${event.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        onClose();
      } catch (error) {
        console.error('Error deleting meeting:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Meeting</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Meeting Title"
          type="text"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Meeting Description"
          type="text"
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Meeting Link"
          type="url"
          fullWidth
          value={meetingLink}
          onChange={e => setMeetingLink(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="Meeting Date"
            value={date}
            onChange={newDate => setDate(newDate)}
            renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="secondary">Delete</Button>
        <Button onClick={onClose} color="secondary">Close</Button>
        <Button onClick={handleSave} color="primary">Save changes</Button>
      </DialogActions>
    </Dialog>
  );
};

const CreateMeetingModal = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(moment().format('HH:mm'));

  const handleCreate = () => {
    const [hours, minutes] = time.split(':').map(Number);
    const meetingDate = date.clone().set({ hour: hours, minute: minutes }).toISOString();

    const meeting = {
      title,
      description,
      meetingLink,
      date: meetingDate,
    };

    onCreate(meeting);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Meeting</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Meeting Title"
          type="text"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Meeting Description"
          type="text"
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Meeting Link"
          type="url"
          fullWidth
          value={meetingLink}
          onChange={e => setMeetingLink(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="Meeting Date"
            value={date}
            onChange={newDate => setDate(newDate)}
            renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
          />
        </LocalizationProvider>
        <TextField
          margin="dense"
          label="Meeting Time"
          type="time"
          fullWidth
          value={time}
          onChange={e => setTime(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleCreate} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyCalendar;
