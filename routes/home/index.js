const express = require("express");
const path = require("path");
const router = express.Router();

const publicPath = path.join(__dirname, "..", "..", "frontend", "dist");

router.get('/', async (req,res) => {
  res.status(200);
  res.sendFile(path.join(publicPath, "index.html"));
  //res.send('This endpoint will serve up the dashboard');
});

module.exports = router;
