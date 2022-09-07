import { Express } from "express";
const express = require("express");
const redis = require("redis");
// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app: Express = express();

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: "host.docker.internal",
    port: 6379,
  },
  password: "",
});

app.use(express.json());
app.get("/v2", (req, res) => {
  redisClient.get("numVisits", function (err: any, numVisits: any) {
    if (err) throw err;
    let numVisitsToDisplay = parseInt(numVisits) + 1;
    if (isNaN(numVisitsToDisplay)) {
      numVisitsToDisplay = 1;
    }
    numVisits++;
    res.status(200).json({
      message: "Open e ID greets you.",
      body: req.body,
      visits: numVisitsToDisplay,
    });
    redisClient.set("numVisits", numVisits);
  });
});

// app.get("/v2/sign", (req, res) => {
//   res.send("Signing endpoint here\n");
// });
// app.get("/v2/verify", (req, res) => {
//   res.send("verify endpoint\n");
// });
// app.get("/v2/trustlist", (req, res) => {
//   res.send("verify endpoint\n");
// });
async function start() {
  await redisClient.connect();
  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);
}
start();
