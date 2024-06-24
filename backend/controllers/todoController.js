const mongoose = require("mongoose");
const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  const user_id = req.user._id;
  const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(todos);
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Todo not found!" });
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found!" });
  }
  res.status(200).json(todo);
};

const createTodo = async (req, res) => {
  const { title, checked } = req.body;
  try {
    const user_id = req.user._id;
    const todo = await Todo.create({ title, checked, user_id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Todo not found!" });
  }
  const todo = await Todo.findOneAndDelete({ _id: id });
  if (!todo) {
    return res.status(404).json({ error: "Todo not found!" });
  }
  res.status(200).json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Todo not found!" });
  }
  const todo = await Todo.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!todo) {
    return res.status(404).json({ error: "Todo not found!" });
  }
  res.status(200).json(todo);
};

module.exports = { getTodos, getTodo, createTodo, deleteTodo, updateTodo };
