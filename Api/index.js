/* Importing the app.js file. */
const app = require("./app");
/* Importing the http module. */
const server = require("http").Server(app);
/* Importing the socket.io module. */
server.listen(4001, "localhost", () => {
  console.log("Server Started");
});