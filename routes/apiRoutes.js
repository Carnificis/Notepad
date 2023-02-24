const app = require('express').Router();
let db = reqire("../db/db.json");

app.get("/notes", (req, res) => {
    db = JSON.parse(fs.readFileSync("./db/db.json")) || [];
    res.json(db);
});

