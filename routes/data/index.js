const express = require("express");
const router = express.Router();
const { senate, house } = require("../../mongodb/schemas");
const { find } = require("../../controllers/senate");

router.get('/senate/:source', async (req,res) => {
  let source = req.params.source;
  let Model = senate.filter(x => x.collection.collectionName === source)[0];
  if(!Model)
    return res.send("That resource could not be found.");
  let data = await find(Model, req.query);
  res.send(data);
});

router.get('/house/:source', async (req,res) => {
  let source = req.params.source;
  let Model = house.filter(x => x.collection.collectionName === source)[0];
  let data = await find(Model, req.query);  
  res.send(data);
});

module.exports = router;
