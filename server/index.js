const io = require("socket.io")(process.env.PORT || 3002, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let roomMessages = {};  
  
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  
    socket.on("join-room", (roomId) => {
      console.log("User joined room:", roomId);
      socket.join(roomId);
      io.to(roomId).emit("room-users", getUsersInRoom(roomId));
  
      if (roomMessages[roomId]) {
        socket.emit("receive-message", roomMessages[roomId]);
      }
    });
  
  
  
  
    socket.on("send-message", (data) => {
      const { roomId, message, senderId} = data;
  
      if (!roomMessages[roomId]) {
        roomMessages[roomId] = [];
      }
  
      roomMessages[roomId].push({ message, senderId });
  
      io.to(roomId).emit("receive-message", {message, senderId });
    });
  
  
    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  
  function getUsersInRoom(roomId) {
    const clients = io.sockets.adapter.rooms.get(roomId);
    return clients ? Array.from(clients) : [];
  }
  