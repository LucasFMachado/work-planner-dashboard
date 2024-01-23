import mongoose from 'mongoose'

const protocolSchema = new mongoose.Schema({
  number: { type: Number, require: true },
  requestor: { type: String, require: true },
  description: { type: String },
  address: { type: String, require: true },
  city: { type: mongoose.Types.ObjectId, ref: 'City', required: true },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
})

const Protocol =
  mongoose.models.Protocol || mongoose.model('Protocol', protocolSchema)
export default Protocol
