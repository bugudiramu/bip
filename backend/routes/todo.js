const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Get Specific Todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).select('-__v');
    if (!todo) {
      return res.status(400).json({ msg: 'No todo found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Get all todos
router.get('/', async (req, res) => {
  try {
    const { status } = req.body;
    let todos = await Todo.find().select('-__v');
    if (status === 'incomplete') {
      todos = todos.filter((todo) => todo.status === 'incomplete');
    } else if (status === 'completed') {
      todos = todos.filter((todo) => todo.status === 'completed');
    } else {
      todos = todos;
    }
    res.status(200).json(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});
// Create Todo
router.post('/', async (req, res) => {
  const { name, description, status } = req.body;
  try {
    const newTodo = new Todo({
      name,
      description,
      status,
    });
    await newTodo.save();
    res.status(200).json({ msg: 'Todo created successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Update Todo
router.put('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      new: true,
      upsert: true,
    });
    res.status(200).json({
      msg: 'Todo updated successfully',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Delete Todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(400).json({ msg: 'Todo not found' });
    }
    res.status(200).json({
      msg: 'Todo deleted successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
