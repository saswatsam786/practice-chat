const { Server } = require("socket.io");
const port = 3000;

const io = new Server();
const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  //   socket.emit("chat-message", "hello world");
  socket.on("send-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      user: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-left", users[socket.id]);
    delete users[socket.id];
  });
});

io.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// console.log("hello");
