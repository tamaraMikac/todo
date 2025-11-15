const express = require("express");
const tasks = express.Router();
const db = require("../db/conn");

tasks.get("/", async (req,res) => {
    try {
        const task = await db.getTask();
        res.json(task);
    } catch(err) {
        console.error("Napaka pri pridobivanju nalog", err);
        res.status(500).json({error: "Napaka strežnika."});
    }
})

tasks.post("/", async (req, res) => {
    try {
        const { title, description, due_date, priority, status } = req.body;

        const newTask = await db.createTask(title, description, due_date, priority, status);

        res.status(201).json(newTask);
    } catch(err) {
        console.error("Napaka pri ustvarjanju naloge:", err);
        res.status(500).json({error: "Napaka strežnika."})
    }
});

tasks.delete("/:id", async (req, res) => {
    try {
        const deleted = await db.deleteTask(req.params.id);

        if(!deleted) {
            res.status(404).json({error: "Task ni najden"});
        }

        res.json({message:"Task izbrisan", deleted});
    } catch(err) {
        console.error("Napaka pri brisanju naloge:", err);
        res.status(500).json({error:"Napaka strežnika."});
    }
});

module.exports=tasks;