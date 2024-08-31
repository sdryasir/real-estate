import mongoose from 'mongoose';
const { Schema } = mongoose;


const categorySchema = new Schema({
    title: {
        type:String,
        required:[true, 'Please provide the category title'],
        minLength:[3, 'Title must have atleast 3 characters in length'],
        maxLength:[50, 'Title must have less than 50 characters in length'],
        unique:true
    },
    avatar:{
        type:String,
    }
})


export const Category = mongoose.model('category', categorySchema);