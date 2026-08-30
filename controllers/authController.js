// TODO: Handle login requests
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcrypt"
export async function loginController(req, res, next) {
  try {
    const {email ,password} = req.body
    if(!email || !password){
      return res.status(400).json({Error:"email and password must be provided"})
    }
    const admin = await User.findOne({email:email})
    if(admin){
        const check  = await bcrypt.compare(password, admin.passwordHash)
        if(admin && check){
          const token =jwt.sign({
          role:"admin"
          },process.env.JWT_SECRET
          ,{expiresIn:"1d"})
          return res.status(200).json({token})
        }else{
          return res.status(400).json({error:"invaild username or password"})
        }
    }else{
          return res.status(400).json({error:"invaild username or password"})
        }
    
    
    // Get email and password from request body
    // Check if both fields are provided
    // Try to login with provided credentials
    // If login failed (wrong email or password)
    // Login successful, send back token and user info
  } catch (err) {
    // Pass any errors to error handler
    next(err);
  }
}
