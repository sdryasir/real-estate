import mongoose from 'mongoose';
const { Schema } = mongoose;


const UserSchema = new Schema({
    firstname:{
        type:String,
        required:[true, 'Please provide the First Name'],
        minLength:[3, 'firstname must have atleast 3 characters in length'],
        maxLength:[50, 'firstname must have less than 50 characters in length'],
    },
    lastname:{
        type:String,
        required:[true, 'Please provide the lastname'],
        minLength:[3, 'lastname must have atleast 3 characters in length'],
        maxLength:[50, 'lastname must have less than 50 characters in length'],
    },
    username: {
        type:String,
        required:[true, 'Please provide the username'],
        minLength:[5, 'Title must have atleast 5 characters in length'],
        maxLength:[50, 'Title must have less than 50 characters in length'],
        unique:true
    },
    email: {
        type:String,
        required:[true, 'Please provide the email'],
        unique:true
    },
    password: {
        type:String,
        required:[true, 'Please provide the password'],
    },
    phonenumber:{
        type:String
    },
    roles:{
        type:String,
        default:'customer',
        enum:['customer', 'moderator', 'admin']
    },
    avatar:{
        type:String
    }

})


export const User = mongoose.model('user', UserSchema);