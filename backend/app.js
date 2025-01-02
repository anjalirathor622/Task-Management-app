const express = require("express");
const app = express();

require("dotenv").config();
require("./conn/conn");

const cors = require("cors");
const UserAPI = require("./routes/user")
const TaskAPI = require("./routes/task")

app.use(cors());
app.use(express.json())
app.use("/user",UserAPI)
app.use("/task",TaskAPI)

app.use("/",(req,res)=>{
    res.send("hellow from backend side");
});

const PORT = 1000;

app.listen(PORT, ()=>{
    console.log("server started");
});