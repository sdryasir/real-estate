import mongoose from 'mongoose';
const { Schema } = mongoose;


const categorySchema = new Schema({
    title: {
        type:String,
        required:[true, 'Please provide the category title'],
        minLength:[3, 'Title must have atleast 3 characters in length'],
        maxLength:[50, 'Title must have less than 50 characters in length'],
    },
    image:{
       public_id:{
           type:String,
           required:true
       },
       url:{
           type:String,
           required:true
       }
    }
})


export const Category = mongoose.model('category', categorySchema);