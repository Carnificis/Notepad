const app = require('express').Router();
let db = require("../db/db.json");
const fs = require("fs");
//Read
app.get("/notes", (req, res) => {
    db = JSON.parse(fs.readFileSync("./db/db.json")) || [];
    res.json(db);
});

//create
app.post("/notes",( req,res) => {
    let newNoteToSave = {
        ...req.body,
        id: Math.floor(Math.random() * 1000000000)
    }
    db.push(newNoteToSave);
    fs.writeFileSync("./db/db.json", JSON.stringify(db),function(err){
        if(err) throw err;
    });
    res.json(db)
})

app.delete("/notes/:id",( req,res) => {
    
    let tempdbList = []
    for(let i = 0; i < db.length; i++){
        if(db[i].id != req.params.id){
            tempdbList.push(db[i])
        }
    }
    db = tempdbList;
    fs.writeFileSync("./db/db.json", JSON.stringify(db),function(err){
        if(err) throw err;
    });
    res.json(db)
})

module.exports = app;