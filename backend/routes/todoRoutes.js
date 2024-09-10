import express from 'express';
import {
  createTodoController,
  getTodosController,
  getTodoByIdController,
  updateTodoController,
  deleteTodoController,
} from '../controllers/todoController.js';
import { requireSignIn } from '../middlewares/adminauthMiddleware.js';

const router = express.Router();

// Create a new todo
router.post('/create-todos', requireSignIn, createTodoController);

// Get all todos for the logged-in user
router.get('/todos', requireSignIn, getTodosController);

// Get a single todo by ID
router.get('/todos/:id', requireSignIn, getTodoByIdController);

// Update a todo by ID
router.put('/todos/:id', requireSignIn, updateTodoController);

// Delete a todo by ID
router.delete('/todos/:id', requireSignIn, deleteTodoController);

export default router;
