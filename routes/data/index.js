const express = require("express");
const router = express.Router();
const { senate, house } = require("../../mongodb/schemas");
const connect = require("../../mongodb/connect");
const find = require("../../mongodb/methods/find");

router.get('/senate/:source', async (req,res) => {
  let source = req.params.source;
  let { minDate, maxDate } = req.query;
  let option = senate.filter(x => x.collection.collectionName === source)[0];
  let val = await find(option);
  console.log(val);
  res.send(val);
});

router.get('/house/:source', async (req,res) => {
  let source = req.params.source;
  let { minDate, maxDate } = req.query;
  let option = house.filter(x => x.collection.collectionName === source)[0];
  let val = await find(option);  
  res.send(val);
});

module.exports = router;
