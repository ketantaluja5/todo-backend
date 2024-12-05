const Todo = require("../models/todo");

//create a new todo
async function createTodo(data) {
  const newTodo = new Todo({
    title: data,
  });
  return await newTodo.save();
}

//get all todos
async function getTodos() {
  return await Todo.find();
}

//get a single todo
async function getTodoById(id) {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new Error("Todo not found");
  }
  return todo;
}

//update a todo
async function updateTodo(id, data) {
  return await Todo.findByIdAndUpdate(id, data, { new: true });
}

//delete a todo
async function deleteTodo(id) {
  return await Todo.findByIdAndDelete(id);
}
module.exports = { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
