const TaskGiver = require("../models/TaskGiver");
const { validationResult } = require("express-validator");

//@desc Create a new task giver
//@route POST /admin-panel/task-givers
//@access public
exports.createTaskGiver = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, photo, about, taskGiverId, priority, totalTasks } = req.body;

  //check for duplicate by name
  const taskGiverFound = await TaskGiver.findOne({ name });
  if (taskGiverFound) {
    res.status(409).json({
      status: false,
      message: "Task giver with given name already exists",
      data: null,
    });
  }

  const priorityConflict = await TaskGiver.findOne({ priority: priority });
  if (priorityConflict) {
    priorityConflict.priority = (await TaskGiver.countDocuments()) + 1;
    await priorityConflict.save();
  }

  //create item
  const taskGiverCreated = await TaskGiver.create({
    name,
    photo,
    about,
    taskGiverId,
    priority,
    totalTasks,
  });

  //send created item
  res.status(201).json({
    status: true,
    message: "Task giver created successfully",
    data: taskGiverCreated,
  });
};

//@desc Get all task givers
//@route GET /admin-panel/task-givers
//@access public
exports.getAllTaskGivers = async (req, res) => {
  res.status(200).json(res.result);
};

//@desc Get task givers by id
//@route GET /admin-panel/task-givers/:id
//@access public
exports.getTaskGiver = async (req, res, next) => {
  try {
    const taskGiver = await TaskGiver.findById(req.params.id);

    if (!taskGiver) {
      throw new Error("No data found", { statusCode: 404 });
      // res.status(404).json({
      //   status: false,
      //   data: {},
      //   message: "No data found.",
      // });
    }
    res.status(200).json({
      status: true,
      data: taskGiver,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

//@desc Update task giver by id
//@route PUT /admin-panel/task-givers/:id
//@access public
exports.updateTaskGiver = async (req, res) => {
  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    return res.status(400).json({
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  const { name, photo, about, taskGiverId, priority, totalTasks } = req.body;

  //check if task giver exists
  const taskGiverFound = await TaskGiver.findById(req.params.id);
  if (!taskGiverFound) {
    res.status(404).json({
      status: false,
      data: {},
      message: "No data found.",
    });
  }

  if (priority && taskGiverFound.priority !== priority) {
    const priorityConflict = await TaskGiver.findOne({ priority: priority });
    if (priorityConflict) {
      priorityConflict.priority = taskGiverFound.priority;
      await priorityConflict.save();
    }
  }

  const taskGiverUpdated = await TaskGiver.findByIdAndUpdate(
    req.params.id,
    {
      name: name ? name : taskGiverFound.name,
      photo: photo ? photo : taskGiverFound.photo,
      about: about ? about : taskGiverFound.about,
      taskGiverId: taskGiverId ? taskGiverId : taskGiverFound.taskGiverId,
      priority: priority ? priority : taskGiverFound.priority,
      totalTasks: totalTasks ? totalTasks : taskGiverFound.totalTasks,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Task giver updated successfully",
    data: taskGiverUpdated,
  });
};

//@desc Delete task giver by id
//@route DELETE /admin-panel/task-givers/:id
//@access public
exports.deleteTaskGiver = async (req, res) => {
  const taskGiverFound = await TaskGiver.findById(req.params.id);
  if (taskGiverFound) {
    await TaskGiver.updateMany(
      { priority: { $gte: taskGiverFound.priority } },
      { $inc: { priority: -1 } }
    );
  }
  await taskGiverFound.delete();

  res.status(200).json({
    status: true,
    message: "Task giver deleted successfully.",
    data: {},
  });
};
