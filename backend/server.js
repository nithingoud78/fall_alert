const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const Alert = require("./models/Alert");

// ➕ ADD THIS MODEL
const Data = require("./models/Data");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.get("/", (req,res)=>{
  res.send("API running");
});


// ===================== ALERT ROUTES =====================

// GET ALL ALERTS
app.get("/api/alerts", async (req,res)=>{
  const alerts = await Alert.find().sort({timestamp:-1});
  res.json(alerts);
});

// CREATE ALERT
app.post("/api/alert", async (req,res)=>{

  const {deviceId, latitude, longitude, fallDetected} = req.body;

  const alert = new Alert({
    deviceId,
    latitude,
    longitude,
    fallDetected
  });

  await alert.save();

  io.emit("new-alert", alert);

  res.json({message:"Alert stored successfully"});
});


// ===================== DATA COLLECTION ROUTE =====================

// ➕ ADD THIS BLOCK
app.post("/api/data", async (req,res)=>{

  try{
    const { ax, ay, az, gx, gy, gz, label } = req.body;

    const data = new Data({
      ax,
      ay,
      az,
      gx,
      gy,
      gz,
      label
    });

    await data.save();

    res.json({message:"Data stored successfully"});
  }
  catch(err){
    res.status(500).json({error: err.message});
  }

});

// OPTIONAL: view data
app.get("/api/data", async (req,res)=>{
  const data = await Data.find().limit(100);
  res.json(data);
});


server.listen(5000, ()=>{
  console.log("Server running on port 5000");
});