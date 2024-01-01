const http = require("node:http");
const fs = require("node:fs/promises");
class ButterJS {
  constructor() {
    this.server = http.createServer();
    /**
     * {
     * "get/": ()=>{}
     * "post/upload": ()=>{}
     * }
     */
    this.routes = {};
    this.server.on("request", (request, response) => {
      response.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, "r");
        const fileStream = fileHandle.createReadStream();
        response.setHeader("Content-Type", mime);
        fileStream.pipe(response);
      };
      response.status = (code) => {
        response.statusCode = code;
        return response;
      };
      response.json = (data) => {
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(data));
      };
      if (!this.routes[request.method.toLowerCase() + request.url]) {
        return response.status(404).json({
          error: `Cannot ${request.method} ${request.url}`,
        });
      }
      this.routes[request.method.toLowerCase() + request.url](
        request,
        response
      );
      //   console.log("A request came in");
    });
  }
  route(method, path, cb) {
    this.routes[method + path] = cb;
  }
  lissten(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}
module.exports = ButterJS;
