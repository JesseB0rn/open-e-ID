"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const redis = require("redis");
const PORT = 8080;
const HOST = "0.0.0.0";
const app = express();
const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
});
app.use(express.json());
app.get("/v2", (req, res) => {
    redisClient.get("numVisits", function (err, numVisits) {
        err;
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
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield redisClient.connect();
        app.listen(PORT, HOST);
        console.log(`Running on http://${HOST}:${PORT}`);
    });
}
start();
//# sourceMappingURL=server.js.map