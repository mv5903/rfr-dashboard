// nodemon index.ts
import express from "express";
const cors = require('cors');
import path from "path";
import { ClickupHelper } from "./ClickupHelper";
import { SECRETS } from "../../src/secrets.js";

const app = express();
const port = 8080;

app.use(cors());

// Configure Express to use EJS
app.set("views", path.join( __dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Hello world!");
});

let clickupHelper: ClickupHelper;

app.get("/tasks", (req, res) => {
    if (!clickupHelper) {
        if (!SECRETS.clickupAPIKey) {
            res.send("ERROR: CLICKUP_API_KEY not set");
            return;
        }
        clickupHelper = new ClickupHelper(SECRETS.clickupAPIKey);
    }
    clickupHelper.getTasks().then((data) => {
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
