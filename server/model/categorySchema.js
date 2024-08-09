import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
  category: { type: String, required: true, unique: true },
  description: { type: String },
  subCategory: [{ type: String }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Products' }], 
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
