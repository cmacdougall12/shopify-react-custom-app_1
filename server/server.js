const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket created", 1);
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ text }) => {
    console.log("message sent", text);

    socket.broadcast.to(2).emit("receive-message", {
      sender: id,
      text,
    });
    console.log("message received", text);
  });
});
