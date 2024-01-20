import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  deadline: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null },
})

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)
export default Task
