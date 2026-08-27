// TODO: Handle creating new announcement
import { Socket } from "socket.io";
import { getIo } from "../sockets/ioInstance.js";


export async function createAnnouncementController(req, res, next) {
  try {
    const url = req.url
    const station = url.split("/")[4]
    const {announcement} = req.body
    console.log(url,station,announcement)
    if(announcement.text){console.log("text found in announcement")}
    const createdAnnounce = await Announcement.create({
      stationId,
      text
    })
    const io = getIo();
    console.log(io)
    Socket.to("station").emit("announcement", {
    text: "Train delayed",
    station: 5
    });
    res.status(200).json({createdAnnounce})
    // Get station ID from URL parameter
    // Get announcement text from request body
    // Check if text was provided
    // Create announcement in database
    // Get socket.io instance to send real-time updates
    // If socket.io is available, send announcement to all users watching this station
    // Send success response with the new announcement
  } catch (err) {
    // Pass any errors to error handler
    next(err);
  }
}
