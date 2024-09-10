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
  stock: {
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
  ratings: {
    type: Number,
    min: [1, 'Minimum rating is 1'],
    max: [5, 'Maximum rating is 5'],
    required: [true, 'Please provide the rating'],
  },
  category: {
    type: String,
    required: [true, 'Please provide the category'],
  },
  weight: {
    type: Number,
    min: [1, 'Minimum weight is 1'],
    max: [20, 'Maximum weight is 20'],
    required: [true, 'Please provide the weight'],
  },
  numOfReviews: {
    type: Number,
    min: [0, 'Minimum number of reviews is 0'],
    required: [true, 'Please provide the number of reviews'],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the user'],
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
