const express = require("express");
const router = express.Router();
const house = require("../../scripts/house");
const senate = require("../../scripts/senate");

router.get('/', (req,res) => {
  res.status(404);
  res.send("Please access a specific script");
});

router.get('/senate/stats/:committee/', (req,res) => {
  let committee = req.params.committee;
  res.send(`This is the route for ${committee}`);
});

router.get('/house/stats/:committee', (req,res) => {
  let committee = req.params.committee;
  res.send(`This is the route for ${committee}`);
});

module.exports = router;
