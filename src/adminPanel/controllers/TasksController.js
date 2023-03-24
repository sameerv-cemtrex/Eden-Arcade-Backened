const { validationResult } = require("express-validator");
const Counter = require("../models/Counter");
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, giver, type, goal, rewards } = req.body;

  const taskCreated = await Task.create({
    title,
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
    message: "Create task api endpoint",
    data: taskCreated,
  });
};
