import mongoose from 'mongoose';
const { Schema } = mongoose;


const productSchema = new Schema({
    title: {
        type:String,
        required:[true, 'Please provide the title'],
        minLength:[5, 'Title must have at least 5 characters in length'],
        maxLength:[50, 'Title must have less than 50 characters in length'],
        unique:true
    },
    description: String,
    price: {
        type:Number,
        required:[true, 'Please provide the price']
    },
    stock:{
        type:Number,
        min:[0, 'Please set 0 or more as minimum stock'],
        max:[1000, 'Please set 1000 or less as mx stock'],
        required:[true, 'Please provide the stock']
    },
    weight:{
        type:Number,
        min:[0, 'Please set 0 or more as minimum weight'],
        max:[10, 'Please set 10 or less as mx weight'],
        required:[true, 'Please provide the weight']
    },
    ratings: {
        type: Number,
        default: 0,
      },
    numReviews: {
        type: Number,
        default: 0,
      },
    reviews: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please add a category']
  },
},
{
    timestamps:true
}
)


export const Product = mongoose.model('product', productSchema);
