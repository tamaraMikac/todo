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



users.get("/login", async (req, res) => {
  const userId = req.cookies?.sessionUser;

  if (!userId) return res.json({ logged: false });

  const user = await db.getUserById(userId);
  if (!user) return res.json({ logged: false });

  res.json({ logged: true, id: user.id, email: user.email });
});




users.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Manjkajo podatki." });
    }

    const exist = await db.getUserByEmail(email);

    if (!exist) {
      return res.status(404).json({ error: "Uporabnik ne obstaja." });
    }

    if (exist.password !== password) {
      return res.status(401).json({ error: "Napačno geslo." });
    }

    res.cookie("sessionUser", exist.id, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Prijava uspešna." });
  } catch (err) {
    console.error("Napaka pri prijavi uporabnika", err);
    res.status(500).json({ error: "Napaka strežnika." });
  }
});



users.post("/register", async (req,res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const existing = await db.getUserByEmail(email);

        if(existing) {
            res.status(400).json({ error: "Email je že zaseden"});
        }

        const newUser = await db.createUser( email, password, firstName, lastName);

        res.cookie("sessionUser", newUser.id, {
            httpOnly:true,
            secure:false,
            sameSite: "lax",
            maxAge: 24*60*60*1000
        });

        res.status(201).json({
            message: "Registracija uspešna.",
            user: newUser
        });

    } catch(err) {
        console.error("Napaka pri registracija uporabnika:", err);
        res.status(500).json({ error: "Napaka strežnika."})
    }
});


users.get("/:id", async (req, res) => {
   const id = Number(req.params.id);

  // ako id NIJE broj, odmah vrati grešku / 404
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Neveljaven ID." });
    // ili: return res.status(404).json({ error: "Uporabnik ni bil najden." });
  }
    try {
        const user = await db.getUserById(req.params.id);

        if(!user){
            res.status(404).json({error: "Uporabnik ni bil najden."})
        }
    res.json(user);
    } catch(err) {
        console.error("Napaka pri pridobivanju uporabnika:", err);
        res.status(500).json({error: "Napaka strežnika."})
    }
});


module.exports=users;