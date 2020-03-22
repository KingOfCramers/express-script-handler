const express = require("express");
const router = express.Router();

router.get('/', (req,res,next) => {
  if(req.headers.password === process.env.SCRIPT_PASSWORD && process.env.SCRIPT_PASSWORD){
    next();
} else {
    res.status(403);
    res.send("Sorry, only the server may access this url.");
  }
});

module.exports = router;
