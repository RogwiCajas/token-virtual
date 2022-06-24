var express = require('express');
var router = express.Router();
const tokenModel = require("../models/token_info");

/* GET token test */
router.get('/', async function(req, res, next) {
  await tokenModel.findAll().then(
    (data) => {
        res.send({token: data}); 
    }
  ).catch((err) => {
      res.send({error: err});
  })
});

module.exports = router;
