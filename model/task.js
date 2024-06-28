const mongoose = require("mongoose");

const checklistSchema = mongoose.Schema({
  checked: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["high", "moderate", "low"],
    required: true,
  },
  assignTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  checklists: {
    type: [checklistSchema],
    required: true,
  },
  status: {
    type: String,
    enum: ["backlog", "inProgress", "todo", "done"],
    default: "todo",
    required: true,
  },
  dueDate: { type: Date, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});


const Task = mongoose.model('Task',taskSchema)

module.exports = Task