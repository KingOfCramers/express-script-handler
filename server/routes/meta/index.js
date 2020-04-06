const express = require("express");
const router = express.Router();
const wrapAsync = require("../../middleware/wrapAsync");
const schemas = require("@mongodb/schemas");
const { getKeys } = require("../../controllers/meta");

router.get('/keys/:type/:source', wrapAsync(async (req,res) => {
  let type = req.params.type;
  let source = req.params.source;
  let schemaCategoryRow = schemas[type]; // Pick the property, to get a row of schemas

  let Model = schemaCategoryRow.filter(x => x.collection.collectionName === source)[0];
  if(!Model){
    res.status(404);
    return res.send("That collection could not be found.");
  }
  let data = await getKeys(Model);
  res.send(data);
}));

module.exports = router;
