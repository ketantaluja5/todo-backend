const express = require("express");
const router = express.Router();
const {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
  getTodoById,
} = require("../controllers/todoController");

//create a new todo
router.post("/", async (req, res) => {
  try {
    const todo = await createTodo(req.body.title);
    return res.status(201).json({
      data: todo,
      success: true,
      message: "Todo created successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Failed to create todo",
      error: err.message,
    });
  }
});

//get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await getTodos();
    return res.status(200).json({
      data: todos,

      success: true,
      message: "Todos fetched successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch todos",
      error: err.message,
    });
  }
});

//get a single todo
router.get("/:id", async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id);
    if (todo) {
      res.status(200).json({
        data: todo,
        success: true,
        message: "Todo fetched successfully",
      });
    }
  } catch (err) {
    if (err.message === "Todo not found") {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }
});

//update a todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await updateTodo(req.params.id, req.body);
    return res.status(200).json({
      data: todo,
      success: true,
      message: "Todo updated successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Failed to update todo",
      error: err.message,
    });
  }
});

//delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await deleteTodo(req.params.id);
    return res.status(200).json({
      data: todo,
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete todo",
      error: err.message,
    });
  }
});

module.exports = router;
