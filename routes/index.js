const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
  res.send("You've reached the homepage!");
});

module.exports = router;
