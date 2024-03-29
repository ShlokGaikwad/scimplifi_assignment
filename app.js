const express = require("express");
const multer = require("multer");
const app = express();

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

app.post("/upload", upload.single("file"), (req, res) => {
  res.json("file uploaded");
});

app.listen(4000, () => {
  console.log("server is running");
});
