const express = require("express");
const router = express.Router();
const house = require("../../scripts/house");
const senate = require("../../scripts/senate");

router.get('/', (req,res) => {
  res.status(404);
  res.send("Please access a specific script");
});

router.get('/update/senate/:committee', (req,res) => {
  let committee = req.params.committee;
  let script = getScript(committee);
});

router.get('/update/house/:committee', (req,res) => {

});

module.exports = router;
