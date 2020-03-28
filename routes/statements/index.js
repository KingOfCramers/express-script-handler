const express = require("express");
const router = express.Router();
const { statements } = require("../../controllers/propublica");

router.get('/:date', async (req,res) => {
  let date = req.params.date;
  let offset = req.query.offset || 0;
  let options = {
    headers: {
      'X-API-Key': process.env.PRO_PUBLICA_API 
    }
  };

  let result = await statements({ date, offset, options });
  res.status(result.status);
  res.send(result.msg);

  });

module.exports = router; 
