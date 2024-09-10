
import {Product} from "../models/product.model.js"
import { v2 as cloudinary } from 'cloudinary';

export default class ProductController{
    
    async createProduct(req, res, next) {
        const {
            title,
            price,
            stock,
            description,
            ratings,
            weight,
            mainImage,  // Base64 encoded string
            remainingImages // Array of Base64 encoded strings
        } = req.body;

        // Check if mainImage is provided
        if (!mainImage) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a main image',
            });
        }

        try {
            // Upload main image to Cloudinary and store only the secure URL
            const mainImageResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'ecommerce-b14/main_images' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url); // Store only the secure URL
                        }
                    }
                ).end(Buffer.from(mainImage.split(",")[1], 'base64'));
            });

            // Upload remaining images to Cloudinary and store their secure URLs
            let remainingImageUrls = [];
            if (remainingImages && Array.isArray(remainingImages)) {
                const uploadPromises = remainingImages.map(image => {
                    return new Promise((resolve, reject) => {
                        cloudinary.uploader.upload_stream(
                            { folder: 'ecommerce-b14/remaining_images' },
                            (error, result) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(result.secure_url); // Store only the secure URL
                                }
                            }
                        ).end(Buffer.from(image.split(",")[1], 'base64'));
                    });
                });

                remainingImageUrls = await Promise.all(uploadPromises);
            }

            // Create new product and store only URLs
            const product = await Product.create({
                title,
                price,
                stock,
                description,
                ratings,
                weight,
                mainImage: mainImageResult, // Store the main image URL
                images: remainingImageUrls, // Store remaining images URLs
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
            const { search, sort, page = 1, limit = 20 } = req.query;

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


