import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: { type: String, require: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
})

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)
export default Team
