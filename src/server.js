"use strict";

const express = require("express");
const cose = require("cose-js");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();
app.use(express.json());
app.get("/v2", (req, res) => {
  res.status(200).json({
    message: "Sample Docker Redis Application",
  });
});

app.get("/v2/sign", (req, res) => {
  res.send("Signing endpoint here\n");
});
app.get("/v2/verify", (req, res) => {
  res.send("verify endpoint\n");
});
app.get("/v2/trustlist", (req, res) => {
  res.send("verify endpoint\n");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
