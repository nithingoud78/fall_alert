const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
  console.log("DB Name:", mongoose.connection.name);
})
.catch(err => console.log(err));

// ===== MODELS =====
const Alert = require("./models/Alert");

const DataSchema = new mongoose.Schema({
  ax: Number,
  ay: Number,
  az: Number,
  gx: Number,
  gy: Number,
  gz: Number,
  label: Number,
  timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model("Data", DataSchema);

// ===== SOCKET =====
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// ===== ROUTES =====

app.get("/", (req,res)=>{
  res.send("API running");
});

// -------- ALERT ROUTES --------
app.get("/api/alerts", async (req,res)=>{
  const alerts = await Alert.find().sort({timestamp:-1});
  res.json(alerts);
});

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

// -------- DATA ROUTES --------

// 🔴 MAIN DATA SAVE
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

    console.log("DATA SAVED:", data);

    res.json({message:"Data stored successfully"});

  } catch(err){
    console.log("ERROR:", err);
    res.status(500).json({error: err.message});
  }
});

// 🔴 FETCH DATA (LATEST FIRST)
app.get("/api/data", async (req,res)=>{
  const data = await Data.find().sort({timestamp:-1}).limit(500);
  res.json(data);
});

// ===== START SERVER =====
server.listen(5000, ()=>{
  console.log("Server running on port 5000");
});