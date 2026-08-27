// Import function to save socket.io instance
import { setIo } from "./ioInstance.js";

// TODO: Main function to set up all socket events
export default function setupSockets(io) {
  // Save io instance so other files can use it
  setIo(io);

  // Listen for new socket connections
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // TODO: When user joins a station room
    socket.on("joinStation", (stationId) => {
      console.log("station joined",stationId)
      socket.join(stationId)

      // Add this socket to the station room
      // Count how many people are watching this station
      // Tell everyone in the room how many watchers there are
    });

    // TODO: When user leaves a station room
    socket.on("leaveStation", (stationId) => {
      console.log(`${socket.id} left ${stationId}`)
      socket.leave(stationId)
      // Remove this socket from the station room
      // Count remaining watchers
      // Update everyone with new watcher count
    });

    // When socket disconnects (user closes browser/tab)
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}
