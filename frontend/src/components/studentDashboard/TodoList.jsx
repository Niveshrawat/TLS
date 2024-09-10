import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', dueDate: '', completed: false });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const token = localStorage.getItem('token'); 

        const response = await axios.get('https://api.thelearnskills.com/api/v1/todo/todos', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Check if response data contains 'todos' property
        if (response.data && Array.isArray(response.data.todos)) {
          setTodos(response.data.todos);
        } else {
          console.error('Unexpected response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }

    fetchTodos();
  }, []);

  const handleOpen = (todo = null) => {
    if (todo) {
      setEditId(todo._id);
      setNewTodo({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate?.split('T')[0] || '',
        completed: todo.completed
      });
    } else {
      setEditId(null);
      setNewTodo({ title: '', description: '', dueDate: '', completed: false });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setNewTodo(prevState => ({
      ...prevState,
      [name]: name === 'completed' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 

      if (editId) {
        if (!editId) {
          console.error('editId is undefined');
          return;
        }

        await axios.put(`https://api.thelearnskills.com/api/v1/todo/todos/${editId}`, newTodo, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTodos(prevTodos => 
          prevTodos.map(todo => (todo._id === editId ? { ...todo, ...newTodo } : todo))
        );
      } else {
        const response = await axios.post('https://api.thelearnskills.com/api/v1/todo/create-todos', newTodo, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTodos(prevTodos => [...prevTodos, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving todo:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); 

      await axios.delete(`https://api.thelearnskills.com/api/v1/todo/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleComplete = async (id, completed) => {
    try {
      const token = localStorage.getItem('token'); 

      await axios.put(`https://api.thelearnskills.com/api/v1/todo/todos/${id}`, { completed }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.map(todo => (todo._id === id ? { ...todo, completed } : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>To-Do List</Typography>
      <Button onClick={() => handleOpen()} variant="contained" color="primary">Add New To-Do</Button>
      <List>
        {Array.isArray(todos) && todos.map(todo => (
          <ListItem key={todo._id}>
            <ListItemText
              primary={todo.title}
              secondary={`${todo.description} (Due: ${new Date(todo.dueDate).toLocaleDateString()})`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleComplete(todo._id, !todo.completed)}
                />
              }
              label="Completed"
            />
            <Button onClick={() => handleOpen(todo)} variant="outlined">Edit</Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(todo._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Edit To-Do' : 'Add New To-Do'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={newTodo.title}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={newTodo.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              type="date"
              label="Due Date"
              name="dueDate"
              value={newTodo.dueDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="completed"
                  checked={newTodo.completed}
                  onChange={handleChange}
                />
              }
              label="Completed"
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">Cancel</Button>
              <Button type="submit" variant="contained" color="primary">{editId ? 'Update' : 'Add'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default TodoList;
