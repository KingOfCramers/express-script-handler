const express = require("express");
const router = express.Router();

router.get('/', (req,res,next) => {
  let trustedIps = ["::1"];
  if(trustedIps.includes(req.connection.remoteAddress)){
    next();
  } else {
    res.status(403);
    res.send("Sorry, only the server may access this url.");
  }
});

module.exports = router;
