import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  productUnit: {
    type: mongoose.Types.ObjectId,
    ref: 'ProductUnit',
    required: true,
  },
  image: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product
