const express = require("express");
require("dotenv").config();
const app = express();

const port = 5013;
const lists = require("./routes/lists");
const users = require("./routes/users");
const tasks = require("./routes/tasks");
const conn = require("./db/conn");


app.use("/lists", lists);
app.use("/users", users);
app.use("/tasks", tasks);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(process.env.PORT || port, () => {
    console.log("Succesfully running on port " + port)
} )