// nodemon index.ts
import express from "express";
const cors = require('cors');
import path from "path";
import { ClickupHelper } from "./ClickupHelper";
import { SECRETS } from "../../src/secrets.js";
var fs = require("fs");
var https = require("https");
import * as ics from "ics";

const app = express();
const port = 9000;
const fetchInterval = 10000; // 10 seconds

app.use(cors());

// Configure Express to use EJS
app.set("views", path.join( __dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Hello world!");
});

// Fetch new events every [fetchInterval] seconds. Endpoint simply returns the last fetched events.
let clickupHelper: ClickupHelper;
let tasks: any = "";
setInterval(() => {
    if (!clickupHelper) {
        if (!SECRETS.clickupAPIKey) {
            console.log("ERROR: CLICKUP_API_KEY not set");
            return;
        }
        clickupHelper = new ClickupHelper(SECRETS.clickupAPIKey);
    }
    clickupHelper.getTasks().then((data) => {
        clickupHelper.logger.log("New tasks fetched.");
        tasks = data;
    });
}, fetchInterval);

app.get("/tasks", (req, res) => {
    res.send(tasks);
});

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(port, function () {
    console.log(
      "App listening on port " + port
    );
  });