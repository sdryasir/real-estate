import {Category} from '../models/category.model.js'
import { v2 as cloudinary } from "cloudinary";

    
    export const createCategory = async (req, res, next)=> {
        const category = req.body
        console.log("Category entered data  ",category);
        
        
        try {
            const uploadResult = await cloudinary.uploader
            .upload(req.body.avatar, {
              folder: "ecommerece-b14",
            })
            .catch((error) => {
              next(error);
            });
      console.log("After uploadresult");
      
          if (uploadResult) {
            category.avatar = uploadResult.secure_url;
            console.log(category.avatar);
          }
            await Category.create(category);
            res.json({
                message: "category created successfully",
            })
        } catch (error) {
            // next(new Error(error))
            next(error)
        }
    }
    
     export const getAllCategorys = async (req, res, next) => {
        try {
            const category = await Category.find({})
            res.json({
                message: "getAllCategory called", 
                category       
            })
        } catch (error) {
            next(error);
        } 
    }
    
    export const getCategoryById = async (req, res, next) =>{
       const {id} = req.query
       try {
        const category = await Category.findById(id)
        res.json({
            message: "Category called",
            category
        })
       } catch (error) {
        next(error);
       }
        
    }
    
    export const updateCategory  = async (req, res, next) => {
        const body = req.body;
        const {id} = req.query;
        try {
            const category = await Category.findByIdAndUpdate(id, body)
            res.json({
                message: "Category updated successfully",
                category
            })
        } catch (error) {
            next(error);
        }
    }
    
    export const deleteCategory =  async (req, res, next) => {
        const {id} = req.query;
        try {
            const category = await Category.findByIdAndDelete(id)
            res.json({
                message: "Category Deleted successfully"
            })
        } catch (error) {
            next(error);
        }
    }



