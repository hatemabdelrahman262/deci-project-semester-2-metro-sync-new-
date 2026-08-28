// TODO: Handle login requests
import jwt from "jsonwebtoken"

export async function loginController(req, res, next) {
  try {
    const {email ,password} = req.body
    if(!email || !password){

    }
    const token =jwt.sign({
      role:"admin"
    },process.env.JWT_SECRET
    ,{expiresIn:"1d"})
    res.status(200).json({token})
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
