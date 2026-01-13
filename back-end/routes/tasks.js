const express = require("express");
const tasks = express.Router();
const db = require("../db/conn");

tasks.get("/", async (req, res) => {
  try {
    const { listId } = req.query;

    if (listId) {
      const data = await db.getTasksByList(Number(listId));
      return res.json(data);
    }

    const all = await db.getTask();
    res.json(all);
  } catch (err) {
    console.error("Napaka pri pridobivanju nalog", err);
    res.status(500).json({ error: "Napaka strežnika." });
  }
});

tasks.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await db.updateTaskStatus(req.params.id, status);

    if (!updated) {
      return res.status(404).json({ error: "Task ni najden" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Napaka pri posodobitvi taska:", err);
    res.status(500).json({ error: "Napaka strežnika." });
  }
});


tasks.post("/", async (req, res) => {
    try {
        const { title, description, due_date, priority, status, list_id } = req.body;
        const newTask = await db.createTask(title, description, due_date, priority, status, list_id);

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