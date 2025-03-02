const Task = require("../models/task.model");

const createTask = async (req, res) => {
    try {
      const { title, description, status, type, priority, hoursNeeded, dueDate, executionDate } = req.body;
  
      // নতুন Task তৈরি করা
      const newTask = new Task({
        title,
        description,
        status,
        user : req.user.id,
        type,
        priority,
        hoursNeeded,
        dueDate,
        executionDate
      });
  
      // ডাটাবেজে সংরক্ষণ
      const savedTask = await newTask.save();
  
      res.status(201).json({ success: true, message: "Task created successfully", task: savedTask });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create task", error: error.message });
    }
  };
  

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ _id: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const datadelete = await Task.findByIdAndDelete(req.params.id);
        if (!datadelete) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      // নির্দিষ্ট ID অনুসারে Task খুঁজে আপডেট করা
      const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  
      if (!updatedTask) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
  
      res.status(200).json({ success: true, message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update task", error: error.message });
    }
  };
  

module.exports = {
    createTask,
    getTasks,
    deleteTask,
    updateTask,
    getTaskById
}