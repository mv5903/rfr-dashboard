"use strict";
exports.__esModule = true;
require('dotenv').config();
var express = require("express");
var cors = require('cors');
var path = require("path");
var ClickupHelper_1 = require("./ClickupHelper");
var fs = require("fs");
var https = require("https");
var app = express();
var port = 9000;
var fetchInterval = 10000; // 10 seconds
app.use(cors());
// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
    res.send("Hello world!");
});
// Fetch new events every [fetchInterval] seconds. Endpoint simply returns the last fetched events.
var clickupHelper;
var tasks = "";
setInterval(function () {
    var _a;
    var key = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.CLICKUP_API_KEY) || "";
    if (!clickupHelper) {
        if (key) {
            console.log("ERROR: CLICKUP_API_KEY not set");
            return;
        }
        clickupHelper = new ClickupHelper_1.ClickupHelper(key);
    }
    clickupHelper.getTasks().then(function (data) {
        clickupHelper.logger.log("New tasks fetched.");
        tasks = data;
    });
}, fetchInterval);
app.get("/tasks", function (req, res) {
    res.send(tasks);
});
https
    .createServer({
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
}, app)
    .listen(port, function () {
    console.log("App listening on port " + port);
});
