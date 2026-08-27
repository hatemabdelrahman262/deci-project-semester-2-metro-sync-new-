// TODO: Middleware to check if user is an admin
export function requireAdmin(req, res, next) {
  // Get authorization header from request
  const heaader =req.headers.authorization
  // Split "Bearer token123" into ["Bearer", "token123"]
  const token = header.split(" ")[1]
  // Check if token is provided in correct format
  
  try {
    const decoded= jwt.verify(token,"afgdjgblnb")
    console.log(decoded)
    if(!decoded.role =="admin"){
      return next(Error("invalid action"))
    }
    req.user =decoded
    next()
    // Verify token and decode the data inside it
    // Check if user has admin role
    // Save user info to request for next middleware/controller
    // User is admin, continue to next function
  } catch (err) {
    // Token is invalid or expired
    return res.status(401).json({ message: "Invalid token" });
  }
}
