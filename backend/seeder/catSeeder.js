import mongoose from 'mongoose';
import { Category } from '../models/category.model.js';
import { categories } from './data.js';

const seedCategories = async() => {
    // dropIndex();
  try {
    await mongoose.connect('mongodb+srv://sdryasir:TBKc24olsLKkf2xj@cluster0.1b4wg.mongodb.net/eCommerceDB');

    await Category.deleteMany();
    console.log('Category are deleted');

    await Category.insertMany(categories);
    console.log('All Category are added.');

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
}

const dropIndex = ()=>{
    // Connect to MongoDB
mongoose.connect('mongodb+srv://sdryasir:TBKc24olsLKkf2xj@cluster0.1b4wg.mongodb.net/eCommerceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.once('open', async () => {
    console.log('Connected to MongoDB');
  
    // Drop the index
    try {
      await db.collection('categories').dropIndex('slug_1');
      console.log('Index dropped');
    } catch (error) {
      console.error('Error dropping index:', error);
    } 
  });
}

seedCategories();