const mongoose = require("mongoose");

// Define task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Title is required
  },
  description: {
    type: String,
    required: true,  // Description is required
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],  // Allowed statuses
    default: "pending",  // Default status is pending
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // This links to the User model
    required: true,  // A task must be associated with a user
  },
  type: {
    type: String,
    enum: ["regular", "todo", "hourly"],  // Allowed types
    default: "todo",  // Default type is personal
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],  // Allowed priorities
    default: "low",  // Default priority is low
  },
  hoursNeeded: {
    type: Number,
    required: false,  // Hours needed is not required
  },
  dueDate: {
    type: Date,
    required: false,  // Due date is not required
  },
  executionDate: {
    type: Date,
    required: false,  // Execution date is not required
  },
}, { timestamps: true });  // Timestamps will automatically add createdAt and updatedAt fields

// Create task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
