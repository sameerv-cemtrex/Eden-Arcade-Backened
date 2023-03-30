const { validationResult } = require("express-validator");
const Counter = require("../models/Counter");
const Task = require("../models/Task");

//@desc Create a new task
//@route POST /admin-panel/tasks
//@access public
exports.createTask = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, description, giver, type, goal, rewards } = req.body;

  const taskCreated = await Task.create({
    name,
    description,
    giver,
    type,
    goal,
    rewards,
  });

  await taskCreated.save();
  return res.json({
    status: true,
    code: 201,
    message: "Task created successfully",
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

//@desc Update task by id
//@route PUT /admin-panel/tasks/:id
//@access public
exports.updateTask = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, description, giver, type, goal, rewards } = req.body;

  //check if task exists
  const taskFound = await Task.findById(req.params.id);
  if (!taskFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }
  const taskUpdated = await Task.findByIdAndUpdate(
    req.params.id,
    {
      name: name ? name : taskFound.name,
      description: description ? description : taskFound.description,
      giver: giver ? giver : taskFound.giver,
      type: type ? type : taskFound.type,
      goal: goal ? goal : taskFound.goal,
      rewards: rewards ? rewards : taskFound.rewards,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Task updated successfully",
    data: taskUpdated,
  });
};

//@desc Delete task by id
//@route DELETE /admin-panel/tasks/:id
//@access public
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: true,
    message: "Task deleted successfully.",
    data: {},
  });
};

//@desc Delete multiple tasks by id array
//@route DELETE /admin-panel/tasks
//@access public
exports.deleteTasks = async (req, res) => {
  try {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.status(400).json({
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    const { ids } = req.body;
    const query = { _id: { $in: ids } };

    await Task.deleteMany(query, (err, obj) => {
      if (err) {
        throw new Error("Bad request");
      }
    });

    res.status(200).json({
      status: true,
      message: "Tasks deleted successfully.",
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};