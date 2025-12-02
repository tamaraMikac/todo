const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = 5013;
const lists = require("./routes/lists");
const users = require("./routes/users");
const tasks = require("./routes/tasks");
const conn = require("./db/conn");

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3007"],
    credentials:true,
}))
app.use(cookieParser());
app.use(express.json());
app.use("/lists", lists);
app.use("/users", users);
app.use("/tasks", tasks);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(process.env.PORT || port, () => {
    console.log("Succesfully running on port " + port)
} )