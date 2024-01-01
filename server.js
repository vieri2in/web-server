const ButterJS = require("./ButterJS");
const server = new ButterJS();
server.route("get", "/", (req, response) => {
  response.sendFile("./public/index.html", "text/html");
});
server.route("get", "/styles.css", (req, response) => {
  response.sendFile("./public/styles.css", "text/css");
});
server.route("get", "/script.js", (req, response) => {
  response.sendFile("./public/script.js", "text/javascript");
});
server.route("post", "/login", (req, response) => {
  response.status(400).json({
    message: "Bad login info",
  });
});
server.lissten(8060, () => {
  console.log("Server is listening on 8060");
});
