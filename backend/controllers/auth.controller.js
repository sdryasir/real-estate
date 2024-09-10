
import {User} from "../models/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

export default class AuthController{
    
    async signUp(req, res, next) {
        const user = req.body;
        
        try {
            const uploadResult = await cloudinary.uploader.upload(req.body.avatar, {
                folder: 'ecommerce-b14',
            }).catch((error) => {
               next(error)
            });

            if(uploadResult){
                console.log("uploadResult.secure_url", uploadResult.secure_url);
                
                user.avatar = uploadResult.secure_url;

                user.password = await bcrypt.hash(user.password, 10);
                await User.create(user)
                res.json({
                    success:true,
                    message:"user account has been created"
                })
            }

        } catch (error) {
            next(error);
        }
    }



    async login(req, res, next) {
        const body = req.body;

        if(!body.email) return next(new Error('Provide the email'))
        if(!body.password) return next(new Error('Provide the password')) 

        const user = await User.findOne({email:body.email})
        if(user === null) return next(new Error('this user is not registered'))

        const isPasswordMatched = await bcrypt.compare(body.password, user.password)
        if(!isPasswordMatched) return next(new Error('Invalid password'))

        const token = jwt.sign({
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.roles
        }, process.env.PRIVATEKEY, { expiresIn: '1h' });

console.log("token", token);

        try {
            res.cookie('token',token, { maxAge: 900000, httpOnly: true }).json({
                token,
            })
        } catch (error) {
            console.log(error);
        }
    }
    async logout(req, res, next) {        
        try {
            res.cookie('auth_token','', { maxAge: 0, httpOnly: true }).json({
                success:true,
                message:'You are logged out'
            })
        } catch (error) {
            console.log(error);
        }
    }  
}


