import todoModel from '../models/todoModel.js';

// Create a new todo
export const createTodoController = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user._id;
    
    const newTodo = new todoModel({
      title,
      description,
      dueDate,
      user: userId
    });
    
    await newTodo.save();
    
    res.status(201).send({
      success: true,
      message: "Todo created successfully",
      todo: newTodo
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error creating todo",
      error,
    });
  }
};

// Get all todos for the logged-in user
export const getTodosController = async (req, res) => {
  try {
    const userId = req.user._id;
    const todos = await todoModel.find({ user: userId });
    
    res.status(200).send({
      success: true,
      message: "Todos fetched successfully",
      todos
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching todos",
      error,
    });
  }
};

// Get a single todo by ID
export const getTodoByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoModel.findById(id);

    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Todo fetched successfully",
      todo
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching todo",
      error,
    });
  }
};

// Update a todo by ID
export const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;

    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { title, description, dueDate, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      todo: updatedTodo
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error updating todo",
      error,
    });
  }
};

// Delete a todo by ID
export const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await todoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).send({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting todo",
      error,
    });
  }
};
