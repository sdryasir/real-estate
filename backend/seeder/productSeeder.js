import mongoose from 'mongoose';
import { Product } from '../models/product.model.js';
import { products } from './data.js';

const seedProducts = async() => {
  try {
    await mongoose.connect('mongodb+srv://sdryasir:TBKc24olsLKkf2xj@cluster0.1b4wg.mongodb.net/eCommerceDB');

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