import Station from "../models/Station.js";

// TODO: Get all stations from database, sorted by line and order
export async function getAllStations() {
  const stations = await Station.find({}).sort({order:-1,line:1})
  return stations
}

// Add multiple stations at once (for initial setup)
export async function seedStations(stationsArray) {
  const inserted = await Station.insertMany(stationsArray);
  
  const operations = stationsArray.map((station) => ({
    updateOne: {
      filter: { id: station.id },
      update: { $set: station },
      upsert: true, // Create if doesn't exist
    },
  }));
  // Execute all operations at once
  return await Station.bulkWrite(operations);
}
