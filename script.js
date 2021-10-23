const socket = io("/", { transports: ["websocket"] });

const form = document.querySelector("#sendMessage");
const container = document.querySelector(".messageContainer");

const name = prompt("What is your name?");
renderMessage("You Joined!!✌✌😄🐒");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  renderMessage(`${data.user}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  renderMessage(`${name} Joined!!😎🚀👀`);
});

socket.on("user-left", (name) => {
  renderMessage(`${name} left!!👋👋`);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = form.input.value;
  renderMessage(`You: ${message}`);
  socket.emit("send-message", message);
  form.input.value = "";
});

function renderMessage(message) {
  const msg = document.createElement("div");
  msg.innerText = message;

  container.append(msg);
}
