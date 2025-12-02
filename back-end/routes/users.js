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

users.get("/login", (req, res) => {
  if (req.session && req.session.user) {
    const u = req.session.user;
    return res.json({
      logged: true,
      id: u.uporabnik_id,
      email: u.email,
      username: u.username,
      is_admin: !!u.is_admin,
    });
  }
  res.json({ logged: false });
});


users.post("/", async (req, res) => {
    try {
       const { email, password } = req.body;
     console.log("LOGIN ROUTE HIT:", email, password); 
        const newuser = await db.createUser(username, email, password);
        res.status(201).json(newuser)
    } catch (err) {
        console.error("Napaka pri ustvarjanju uporabnika", err);
        res.status(500).json({error: "Napaka strežnika."})
    }
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
        const { username, email, password } = req.body;

        const existing = await db.getUserByEmail(email);

        if(existing) {
            res.status(400).json({ error: "Email je že zaseden"});
        }

        const newUser = await db.createUser(username, email, password);

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

module.exports=users;