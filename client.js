document.addEventListener("DOMContentLoaded", () => {
    const socket = io("http://localhost:3000");
    const form = document.getElementById("sendcontainer");
    const messageInput = document.getElementById("messageinp");
    const messageContainer = document.querySelector(".container");

    const append = (message, position) => {
        const messageElement = document.createElement("div");
        messageElement.innerText = message;
        messageElement.classList.add("message");
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
    };

    const name = prompt("Enter your name to join");
    socket.emit("user-joined", name);

    socket.on("user-joined", (name) => {
        append(`${name} joined the chat`, "center");
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page refresh
        const message = messageInput.value;
        append(`You: ${message}`, "right");
        socket.emit("send", message);
        messageInput.value = ""; // Clear input field
    });

    socket.on("receive", (data) => {
        append(`${data.name}: ${data.message}`, "left");
    });
});
