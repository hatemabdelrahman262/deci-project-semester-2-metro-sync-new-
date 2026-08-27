import express from "express";
import {getAllStations} from "../services/stationService.js"
import Station from "../models/Station.js";
import jwt from "jsonwebtoken"
import bcrypt  from "bcrypt"
import Announcement from "../models/Announcement.js";
import { Socket } from "socket.io";
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
router.post("/api/v1/stations/*/announcements",(req,res)=>{
    const {text} = req.body
    console.log(text)
    console.log("/api/v1/El-Shohadaa/announcements")
    res.status(201).json({state:"ok"})
})
router.get("/api/v1/stations/*/announcements",async (req,res)=>{
    const url = req.url
    const station = url.split("/")[4]
    console.log(station)
    const announcements =await Announcement.find({station:station})
    console.log(announcements)
    Socket.to(station).emit("announcement",announcements)
    res.status(200).json({announcements})
})

// TODO: Announcements endpoints
// GET announcements for a station (anyone can access)
// POST new announcement (admin only)

export default router;
