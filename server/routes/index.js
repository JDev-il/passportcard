var express = require('express');
var router = express.Router();
const auth = require("../authentication/tokenVerifier");

/* POST */
router.post('/auth', auth, (req, res, next)=>{
  if(req.token){
    next()
  }
})

module.exports = router;
