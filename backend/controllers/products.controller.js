
import {Product} from "../models/product.model.js"
import { v2 as cloudinary } from 'cloudinary';
import { Category } from "../models/category.model.js";

export default class ProductController{
    
    async createProduct(req, res, next) {
        const {
            title,
            price,
            stock,
            description,
            ratings,
            weight,
            numReviews,
            category, // Category ID
            image, // Main image as an array
            reviews, // Not used here but can be used later
            user // Not used here but can be used later
        } = req.body;
    
    
        if (!image || !Array.isArray(image) || image.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a main image',
            });
        }
    
   
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a category ID',
            });
        }
    
        try {
       
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category ID',
                });
            }
    
        
            const mainImageResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'ecommerce-b14/main_images' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url); 
                        }
                    }
                ).end(Buffer.from(image[0].url.split(",")[1], 'base64'));
            });
    
           
            const product = await Product.create({
                title,
                price,
                stock,
                description,
                ratings,
                weight,
                numReviews,
                category, 
                mainImage: mainImageResult, 
                images: [], 
            });
    
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                product,
            });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({
                success: false,
                message: 'Server Error',
                error: error.message,
            });
        }
    }
    
    
    async getAllProducts(req, res, next) {
        try {
            const { search, sort, page = 1, limit = 10 } = req.query;

            // Build query object
            let query = {};
            if (search) {
                query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
            }
            

            // Pagination
            const skip = (page - 1) * limit;

            console.log(query);
            

            // Execute query with sorting and pagination
            const products = await Product.find()
                .sort(sort)
                .skip(skip)
                .limit(parseInt(limit));

            // Get total count for pagination
            const total = await Product.countDocuments(query);

        res.json({
            success: true,
            message: "getAllProducts called",
            products,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
        } catch (error) {
            next(error);
        } 
    }
    
    async getProductById(req, res, next){
       const {id} = req.query
       try {
        const product = await Product.findById(id)
        res.json({
            success:true,
            message: "getProductById clled",
            product
        })
       } catch (error) {
        next(error);
       }
        
    }
    
    async updateProduct (req, res, next) {
        const body = req.body;
        const id = req.body._id        
        try {
            const product = await Product.findByIdAndUpdate(id, body)
            res.json({
                success:true,
                message: "product updated successfully"
            })
        } catch (error) {
            next(error);
        }
    }
    
    async deleteProduct (req, res, next) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id)
            res.json({
                success:true,
                message: "product Deleted successfully",
            })
        } catch (error) {
            next(error);
        }
    }
}


