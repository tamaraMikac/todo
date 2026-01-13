const express = require("express");
const lists = express.Router();
const db = require("../db/conn");

function requireAuth(req, res, next) {
  const userId = req.cookies?.sessionUser; 

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  req.userId = Number(userId);
  next();
}

lists.get("/", requireAuth, async (req, res) => {
  try {
    const userLists = await db.getListbyUser(req.userId); // ili getListsByUser ako si preimenovala
    res.json(userLists);
  } catch (err) {
    console.error("Napaka pri pridobivanju list:", err);
    res.status(500).json({ error: "Napaka strežnika." });
  }
});

lists.post("/", requireAuth, async (req, res) => {
  try {
    const { title } = req.body || {};
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newList = await db.createList(title.trim(), req.userId);
    res.status(201).json(newList);
  } catch (err) {
    console.error("Napaka pri ustvarjanju nove liste:", err);
    res.status(500).json({ error: "Napaka strežnika." });
  }
});

lists.delete("/:id", requireAuth, async (req, res) => {
  try {
    const listId = Number(req.params.id);
    if (!Number.isFinite(listId)) {
      return res.status(400).json({ error: "Invalid list id" });
    }

    const deleted = await db.deleteListForUser(listId, req.userId);
    if (!deleted) {
      return res.status(404).json({ error: "Lista ni najdena." });
    }

    res.json({ message: "Lista izbrisana.", deleted });
  } catch (err) {
    console.error("Napaka pri brisanju liste:", err);
    res.status(500).json({ error: "Napaka strežnika." });
  }
});

module.exports = lists;
