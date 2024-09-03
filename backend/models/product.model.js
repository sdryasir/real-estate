import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide the title'],
    minLength: [5, 'Title must have at least 5 characters'],
    maxLength: [50, 'Title must have less than 50 characters'],
    unique: true,
  },
  price: {
    type: Number,
    min: [100, 'Minimum price is 100'],
    max: [10000, 'Maximum price is 10000'],
    required: [true, 'Please provide the price'],
  },
  quantity: {
    type: Number,
    min: [1, 'Minimum quantity is 1'],
    max: [100, 'Maximum quantity is 100'],
    required: [true, 'Please provide the quantity'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    minLength: [10, 'Description must have at least 10 characters'],
  },
  mainImage: {
    type: String,
    required: [true, 'Please provide a main image'],
  },
  images: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length >= 1 && val.length <= 5;
      },
      message: 'Please provide between 1 and 5 additional images',
    },
  },
});

export const Product = mongoose.model('Product', productSchema);
