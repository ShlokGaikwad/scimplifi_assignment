const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const app = express();

//to store session
const sessions = {};

// multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());

app.get("/", (req, res) => {
  res.json("home route");
});

// create sessions endpoint to upload
app.post("/api/v1/create-session", (req, res) => {
  const sessionId = uuidv4();
  sessions[sessionId] = {
    files: [],
    result: 0,
  };
  res.json({ session_id: sessionId });
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json("file uploaded");
});

app.listen(4000, () => {
  console.log("server is running");
});
