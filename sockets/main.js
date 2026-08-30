// Import function to save socket.io instance
import { setIo } from "./ioInstance.js";

function getViewerCount(io, stationId) {
  const room = io.sockets.adapter.rooms.get(stationId);
  return room ? room.size : 0;
}

function updatePresence(io, stationId) {
  const watchers = getViewerCount(io, stationId);
  io.to(stationId).emit("presenceUpdate", {
    stationId,
    watchers,
  });
  return watchers;
}

export default function setupSockets(io) {
  // Save io instance so other files can use it
  setIo(io);

  // Listen for new socket connections
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinStation", (stationId) => {
      if (!stationId) return;

      socket.join(stationId);
      console.log("station joined", stationId);
      updatePresence(io, stationId);
    });

    socket.on("leaveStation", (stationId) => {
      if (!stationId) return;

      socket.leave(stationId);
      console.log(`${socket.id} left ${stationId}`);
      updatePresence(io, stationId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);

      for (const room of socket.rooms) {
        if (room !== socket.id) {
          updatePresence(io, room);
        }
      }
    });
  });
}
