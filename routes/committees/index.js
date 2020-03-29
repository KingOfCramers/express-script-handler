const express = require("express");
const router = express.Router();
const wrapAsync = require("../../middleware/wrapAsync");
const { senate, house } = require("../../dbs/mongodb/schemas");
const { find } = require("../../controllers/senate");
router.get('/senate/:source', wrapAsync(async (req,res) => {
  let source = req.params.source;
  let Model = senate.filter(x => x.collection.collectionName === source)[0];
  if(!Model){
    res.status(404);
    return res.send("That collection could not be found.");
  }
  let data = await find(Model, req.query);
  res.send(data);
}));

router.get('/house/:source', wrapAsync(async (req,res) => {
  let source = req.params.source;
  let Model = house.filter(x => x.collection.collectionName === source)[0];
  if(!Model){
    res.status(404);
    return res.send("That collection could not be found.");
  }
  let data = await find(Model, req.query);  
  res.send(data);
}));

module.exports = router;
