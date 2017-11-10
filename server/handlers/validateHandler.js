var jwt = require('jwt-simple');
//var validateUser = require('../routes/auth').validateUser;
require('dotenv').config({ path: 'variables.env' });
 
module.exports = function(req, res, next) {
 
  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe. 
 
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
 
  if (token) {
    try {
      var decoded = jwt.decode(token, process.env.JWT);
 
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
 
      // Move to next middleware
      next();
 
    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};