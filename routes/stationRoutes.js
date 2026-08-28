import express from "express";
import {getAllStations} from "../services/stationService.js"
import Station from "../models/Station.js";
import jwt from "jsonwebtoken"
import bcrypt  from "bcrypt"
import Announcement from "../models/Announcement.js";
import { createAnnouncementController } from "../controllers/announcementController.js";
// Create router for station routes
const router = express.Router();

// TODO: Station CRUD endpoints
// GET /api/v1/stations - Get all stations (anyone can access)
router.get("/api/v1/stations",async (req,res)=>{
    console.log("in")
    const stations =await  getAllStations()
    console.log("stations")
    return res.status(200).json(stations)
})
router.post("/api/v1/stations/:station/announcements", createAnnouncementController)
router.get("/api/v1/stations/*/announcements",async (req,res,next)=>{
    const url = req.url
    const station = url.split("/")[4]
    console.log(station)
    const stations = await Announcement.find({stationId:station}).sort({createdAt:-1})
    res.status(200).json({station:stations})
})

// TODO: Announcements endpoints
// GET announcements for a station (anyone can access)
// POST new announcement (admin only)

export default router;
