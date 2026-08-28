// TODO: Handle creating new announcement
import { getIo } from "../sockets/ioInstance.js";
import Announcement from "../models/Announcement.js";

export async function createAnnouncementController(req, res, next) {
  try {
    const { station } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Announcement text is required" });
    }

    const createdAnnounce = await Announcement.create({
      stationId: station,
      text: text.trim(),
    });

    const io = getIo();
    io.to(station).emit("announcement", createdAnnounce.toObject());

    res.status(201).json({ createdAnnounce });
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
