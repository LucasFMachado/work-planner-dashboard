import mongoose from 'mongoose'

const productUnitSchema = new mongoose.Schema({
  unit: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  active: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
})

const ProductUnit =
  mongoose.models.ProductUnit ||
  mongoose.model('ProductUnit', productUnitSchema)
export default ProductUnit
