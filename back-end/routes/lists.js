const express = require("express");
const lists = express.Router();
const db = require("../db/conn");

lists.get("/", async (req,res) => {
    try {
        const list = await db.getTasks();
        res.json(list);
    } catch(err) {
        console.error("Napaka pri pridobivanju list", err);
        res.status(500).json({error:"Napaka strežnika."});
    }
})

lists.post("/", async (req,res) => {
    try {
        const { title } = req.body;

        const newList = await db.createList(title);

        res.status(201).json(newList);
    } catch(err) {
        console.error("Napaka pri ustvarjanju nove liste:", err);
        res.status(500).json({error:"Napaka strežnika."})
    }
});

module.exports=lists;