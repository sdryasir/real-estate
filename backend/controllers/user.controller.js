
import {User} from "../models/user.model.js"


export default class UserController{
    
    async createUser(req, res, next) {
        const user = req.body
        try {
            await User.create(user);
            res.json({
                message: "User created successfully",
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    async getAllUsers(req, res, next) {
        try {
            const users = await User.find()
            res.json({
                success:true,
                message: "List of all users", 
                users       
            })
        } catch (error) {
            console.log(error);
        } 
    }
    
    async getUserById(req, res, next){
       const {id} = req.query
       try {
        const user = await User.findById(id)
        res.json({
            message: "getUserById clled",
            user
        })
       } catch (error) {
        console.log(error);
       }
        
    }
    async getMe(req, res, next){
       const id = req.user.id     
       try {
        const user = await User.findById(id)
        res.json({
            success:true,
            user
        })
       } catch (error) {
        next(new Error(error));
       }
        
    }
    
    async updateUser (req, res, next) {
        const body = req.body;
        const {id} = req.query;
        try {
            const user = await User.findByIdAndUpdate(id, body)
            res.json({
                message: "user updated successfully"
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    async deleteUser (req, res, next) {
        const {id} = req.query;
        try {
            const user = await User.findByIdAndDelete(id)
            res.json({
                message: "user Deleted successfully"
            })
        } catch (error) {
            console.log(error);
        }
    }
}


