
import {Product} from "../models/product.model.js"
import { v2 as cloudinary } from 'cloudinary';

export default class ProductController{
    
    async createProduct(req, res, next) {
        const { title, price, quantity, description } = req.body;
        const { mainImage, remainingImages } = req.files;
    
        // Debug: Check if files are being received correctly
        console.log(req.files);
    
        if (!mainImage || mainImage.length === 0) {
            return res.status(400).json({
                success: false,
                message: ['Please provide a main image'],
            });
        }
    
        try {
            // Upload main image to Cloudinary using the file buffer
            const mainImageResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'ecommerce-b14/main_images' },
                    (error, result) => {
                        if (error) {
                            reject(new Error('Error uploading main image'));
                        }
                        resolve(result);
                    }
                ).end(mainImage[0].buffer); // Using buffer instead of path
            });
    
            // Upload remaining images to Cloudinary using buffers
            const remainingImageUrls = [];
            if (remainingImages && remainingImages.length > 0) {
                for (const file of remainingImages) {
                    const result = await new Promise((resolve, reject) => {
                        cloudinary.uploader.upload_stream(
                            { folder: 'ecommerce-b14/remaining_images' },
                            (error, result) => {
                                if (error) {
                                    reject(new Error('Error uploading remaining images'));
                                }
                                resolve(result.secure_url);
                            }
                        ).end(file.buffer); // Using buffer instead of path
                    });
                    remainingImageUrls.push(result);
                }
            }
    
            // Create product in MongoDB with images
            const product = await Product.create({
                title,
                price,
                quantity,
                description,
                mainImage: mainImageResult.secure_url,
                images: remainingImageUrls,
            });
    
            res.json({
                success: true,
                message: 'Product created successfully',
                product,
                
            });
        } catch (error) {
            next(error);
        }
    }
    
    async getAllProducts(req, res, next) {
        try {
            const products = await Product.find()
            res.json({
                success:true,
                message: "getAllProducts called", 
                products       
            })
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
        const {id} = req.query;
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
        const {id} = req.query;
        try {
            const product = await Product.findByIdAndDelete(id)
            res.json({
                success:true,
                message: "product Deleted successfully"
            })
        } catch (error) {
            next(error);
        }
    }
}


