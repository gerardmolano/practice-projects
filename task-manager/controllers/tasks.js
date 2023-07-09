const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findById(id);
    
    if (task) {
        return res.status(200).json({ task });
    }

    next(createCustomError(404, `not found task with id: ${id}`));
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const  { id } = req.params;
    const data = req.body;

    const task = await Task.findByIdAndUpdate(id, data, { 
        new: true,
        runValidators: true 
    });

    if (task) {
        return res.status(200).json({ task });
    }

    next(createCustomError(404, `not found task with id: ${id}`));
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (task) {
        return res.status(200).json({ task });
    }

    next(createCustomError(404, `not found task with id: ${id}`));
});

module.exports = { getAllTasks,
                   createTask,
                   getTask,
                   updateTask,
                   deleteTask };
