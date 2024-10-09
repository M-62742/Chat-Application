document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
    const socket = io("http://localhost:3000");
    const form = document.getElementById("sendcontainer");
    const messageInput = document.getElementById("messageinp");
    const messageContainer = document.querySelector(".container");
=======
    const socket = new WebSocket("ws://localhost:5001"); // Connect to the WebSocket server
    const form = document.getElementById("sendcontainer");
    const messageInput = document.getElementById("messageinp");
    const messageContainer = document.getElementById("message-container");
>>>>>>> a8d9ad1 (fix issue #1 fixed and updated all)

    const append = (message, position) => {
        const messageElement = document.createElement("div");
        messageElement.innerText = message;
        messageElement.classList.add("message");
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
    };

<<<<<<< HEAD
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
=======
    const name = prompt("Enter your name to join") || "Anonymous";
    append(`${name} joined the chat`, "center");

    // Send a message when the WebSocket connection is opened
    socket.onopen = () => {
        socket.send(name + " has joined the chat");
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
        if (typeof event.data === "string") {
            // Check if the message starts with the user's name
            const senderName = event.data.split(':')[0]; // Extract sender's name
            if (senderName.trim() === name) {
                // append(event.data, "right"); // Append the message to the right if it matches
            } else {
                append(event.data, "left"); // Append the message to the left if it doesn't match
            }
        } else {
            console.warn("Received non-string message:", event.data);
        }
    };


    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page refresh
        const message = messageInput.value.trim(); // Get the message input
        if (message) { // Only send non-empty messages
            const fullMessage = `${name}: ${message}`; // Create the full message with username
            append(`You: ${message}`, "right"); // Display the sent message
            socket.send(fullMessage); // Send the message to the server
            messageInput.value = ""; // Clear input field
        }
>>>>>>> a8d9ad1 (fix issue #1 fixed and updated all)
    });
});
