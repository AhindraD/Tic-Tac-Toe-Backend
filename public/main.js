const socket = io.connect(location.origin);//("http://localhost:8000/")
const inputEl = document.querySelector('.message');


//DISPLAY MSG SYNC
socket.on("new-message", (data) => console.log(data));//displaying broardcasted message
function sendMessage(e) {
  socket.emit("chat-message", inputEl.value);
  inputEl.value = "";
}
