// TODO: Get all announcements for a specific station (newest first)
import Announcement from "../models/Announcement.js";
export async function getAnnouncementsForStation(stationId) {
  const announcements = await Announcement.find({stationdId:stationId})
  return announcements
}

// TODO: Create a new announcement for a station
export async function createAnnouncement(stationId, text) {
  const doc =await Announcement.create({
    stationId: stationId,
    text: text
  })

  // Convert to plain JavaScript object and return
  return doc.toObject();
}
