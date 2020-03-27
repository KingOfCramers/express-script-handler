const express = require("express");
const router = express.Router();
const { disclosures } = require("../../dbs/mongodb/schemas");
const { find } = require("../../controllers/disclosures");

router.get('/disclosures/:source', async (req,res) => {
  let source = req.params.source;
  let Model = disclosures.filter(x => x.collection.collectionName === source)[0];
  if(!Model){
    res.status(404);
    return res.send("That collection could not be found.");
  }
  let data = await find(Model, req.query);
  res.send(data);
});

module.exports = router;
