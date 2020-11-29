// Import Node built-in path module
const path = require("path");
// Getting config vars
require('dotenv').config({path: __dirname + '/.env'});
// Init Express
const express = require("express");
const app = express();
// Import Multer
const multer = require("multer");

// Setup Multer storage
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "files"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Routes
app.get("/", (req, res) => {
    res.status(200).send('Oh Hello!')
  }
);
// Upload route
app.post("/", 
  multer({ storage: diskStorage }).single("file"), (req, res) => {
    const file = req.file.path;
    console.log(`New file saved: ${file}`);
    if (!file) {
      res.status(400).send({
        success: 0,
        message: "No File is selected.",
      });
    }
    res.status(200).send({
      success: 1,
      downloadUrl: req.protocol + '://' + req.get('host') + '/download/' + req.file.filename
    });
  }
);
// Download
app.use('/download', express.static('files'))

// Get port from config
const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`Server started on port: ${port}`);
});