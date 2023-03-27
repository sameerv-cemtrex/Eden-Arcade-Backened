const { validationResult } = require("express-validator");
const Counter = require("../models/Counter");
const Task = require("../models/Task");

//@desc Create a new task
//@route POST /admin-panel/tasks
//@access public
exports.createTask = async (req, res) => {
  const { title, description, giver, type, goals, rewards } = req.body;

  const taskCreated = await Task.create({
    title,
    description,
    giver,
    type,
    goals,
    rewards,
  });

  await taskCreated.save();
  return res.json({
    status: true,
    code: 201,
    message: "Create task api endpoint",
    data: taskCreated,
  });
};

//@desc Get all tasks
//@route GET /admin-panel/tasks
//@access public
exports.getAllTasks = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get task by id
//@route GET /admin-panel/tasks/:id
//@access public
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: task,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};
