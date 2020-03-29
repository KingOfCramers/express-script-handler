const express = require("express");
const router = express.Router();
const wrapAsync = require("../../middleware/wrapAsync")
const { deleteRedisHash } = require("../../controllers/services");

router.get('/expireRedisHash/:hash/:key', wrapAsync(async (req,res) => {
  let { hash, key } = req.params;
  let result = await deleteRedisHash({ hash, key });
  res.status(result.status);
  res.send(result.msg);
}));

module.exports = router; 
