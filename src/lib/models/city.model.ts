import mongoose from 'mongoose'

const citySchema = new mongoose.Schema({
  protocol: { type: Number, require: true },
  name: { type: String, require: true, unique: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
})

const City = mongoose.models.City || mongoose.model('City', citySchema)
export default City
