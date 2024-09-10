import mongoose from 'mongoose';
import { Product } from '../models/product.model.js';
import { products } from './data.js';

const seedProducts = async() => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/e-commerce-b14');

    await Product.deleteMany();
    console.log('Products are deleted');

    await Product.insertMany(products);
    console.log('All Products are added.');

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
}

seedProducts();