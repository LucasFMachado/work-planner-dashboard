import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  role: { type: String, require: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
})

const Employee =
  mongoose.models.Employee || mongoose.model('Employee', employeeSchema)
export default Employee
