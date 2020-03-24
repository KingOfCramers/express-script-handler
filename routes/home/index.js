const express = require("express");
const router = express.Router();

router.get('/', async (req,res) => {
  res.status(200);
  res.send('This is the homepage.');
});

module.exports = router;
