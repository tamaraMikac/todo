const express = require("express");
const users = express.Router();
const db = require("../db/conn");

users.get("/", async (req, res) => {
    try {
     const user = await db.getUsers();
     res.json(user);
    } catch(err) {
        console.error("Napaka pri pridobivanju uporabnikov: ", err);
        res.status(500).json({error: "Napaka strežnika."});
    }});


users.get("/:id", async (req,res) => {
    try {
        const user = await db.getUserByid(req.params.id);

        if(!user){
            res.status(404).json({error: "Uporabnik ni bil najden."})
        }
    res.json(user);
    } catch(err) {
        console.error("Napaka pri pridobivanju uporabnika:", err);
        res.status(500).json({error: "Napaka strežnika."})
    }
});

users.post("/", async (req, res) => {
    try {
       const { username, email, password } = req.body;

        const newuser = await db.createUser(username, email, password);
        res.status(201).json(newuser)
    } catch (err) {
        console.error("Napaka pri ustvarjanju uporabnika", err);
        res.status(500).json({error: "Napaka strežnika."})
    }
});


module.exports=users;