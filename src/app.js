const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

// const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.use(express.json());
app.use(express.urlencoded({express: true}));

app.get("/musicians", async (req, res) => {
    try {
    const musicians = await Musician.findAll();
    res.json(musicians);
    }
    catch(err) {
        console.log(err);
    }

})

//get the musician by id --> returns one object/instance
app.get("/musicians/:id", async (req, res) => {
    try {
    const id = req.params.id
    const musicians = await Musician.findByPk(id);
    res.json(musicians);
    }
    catch(err) {
        console.log(err);
    }

})
app.post("/musicians", async (req, res) => {
    try {
    const newMusician = await Musician.create(req.body)
    res.json(newMusician)
    }
    catch(err) {
        console.log(err)
    }
})

app.put("/musicians/:id", async (req, res) => {
   try { const updatedMusician = await Musician.update(req.body, {where: {id: req.params.id}})
    res.json(updatedMusician);
}
catch(err) {
    console.log(err)
}
})



app.delete("/musicians/:id", async (req, res) => {
  try {  const foundMusician = await Musician.findByPk(req.params.id)
    const deletedMusician = await foundMusician.destroy();
    res.json(deletedMusician);
  }
  catch(err) {
    console.log(err)
  }
})



module.exports = app;