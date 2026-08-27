// GET /api/v1/stations - Get list of all stations
export async function listStations(req, res, next) {
  try {
    const result = getAllStations()
    console.log(result,":hererfs")
    return result
    // TODO: call getAllStations() and return result
  } catch (err) {
    next(err);
  }
}

// TODO: GET /api/v1/stations/:id/announcements - Get all announcements for a station
export async function stationAnnouncements(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}
