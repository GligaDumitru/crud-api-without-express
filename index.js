const http = require("http");
const routes = require("./routes");
const router = require("./router");
const PORT = 5000;
const bodyParser = require("body-parser");

process.on("uncaughtException", err => {
  console.log("UncaughtException");
  console.error(err.stack);
  console.log(err);
});

const server = http.createServer(async (req, res) => {
  await router(req, res, routes);
});
// server.use(bodyParser.urlencoded({ extended: false }))
 
// // parse application/json
// server.use(bodyParser.json())

server.listen(PORT, () => console.log("Server is listening at port " + PORT));
