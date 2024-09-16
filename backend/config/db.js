import mongoose from 'mongoose';

export const connectDB = ()=>{
    mongoose.connect('mongodb+srv://sdryasir:TBKc24olsLKkf2xj@cluster0.1b4wg.mongodb.net/eCommerceDB')
    .then(()=>console.log('Database is connected'))
    .catch((err)=>console.log(err))
}

