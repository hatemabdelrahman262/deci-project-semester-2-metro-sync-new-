import express from "express";
import { loginController } from "../controllers/authController.js";
import { rateLimit } from 'express-rate-limit'
// Create router for authentication routes
const router = express.Router();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, 
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})
// POST /api/v1/auth/login - Login endpoint
router.post("/api/v1/auth/login",limiter, loginController);

export default router;
