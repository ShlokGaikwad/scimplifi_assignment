const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();

//to store session
let sessions = {};

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

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

//upload file and calculate result
app.post(
  "/api/v1/upload-file/:session_id",
  upload.single("file"),
  (req, res) => {
    const sessionId = req.params.session_id;
    // console.log(sessionId);
    const filePath = req.file.path;

    if (!sessions[sessionId]) {
      return res.status(400).json({ err: "session not found" });
    }

    const files = sessions[sessionId].files;

    //it will help if files exceeds 15 then drop first file
    if (files.length >= 15) {
      files.shift();
    }

    const calc = fs.readFileSync(filePath, "utf8");
    files.push({ calc });

    let total = 0;
    files.forEach((item) => {
      const res = eval(item.calc);
      if (!isNaN(res)) {
        total += res;
      }
    });

    sessions[sessionId].result = total;
    res.json({ result: total });
  }
);

//delete session
app.delete("/api/v1/delete_session/:session_id", (req, res) => {
  const sessionId = req.params.session_id;
  delete sessions[sessionId];
  res.status(200).send("session deleted successfully");
});

//file delete with index
app.delete("/api/v1/delete_file/:session_id/:file_idx", (req, res) => {
  const sessionId = req.params.session_id;
  const file_idx = parseInt(req.params.file_idx);
  const files = sessions[sessionId].files;

  if (files[file_idx]) {
    files.splice(file_idx, 1);

    let total = 0;
    files.forEach((item) => {
      const res = eval(item.calc);
      if (!isNaN(res)) {
        total += res;
      }
    });
    sessions[sessionId].result = total;
    res.json({ result: total });
  } else {
    res.status(400).json("file not found");
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
