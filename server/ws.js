const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("Client connected.");

    ws.on("message", (message) => {
        console.log(`New message: ${JSON.stringify(message)}`)
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected.");
    });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});