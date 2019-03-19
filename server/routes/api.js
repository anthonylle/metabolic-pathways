const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
/*const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/MEAN', (err, db) => {//'mongodb://heroku_1lnxd10m:h16ioa5tul5q9ofvae2onnb00@ds137291.mlab.com:37291/heroku_1lnxd10m', (err, db) => {
    if (err) return console.log(err);

    closure(db);
  });
};*/

const connection = function(closure) {
  return MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if (err) return console.log(err);
    var dbo = db.db('MEAN');
    closure(dbo);
  });
};


// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};


// Get users
router.get('/users', (req, res) => {
  connection((dbo) => {
    dbo.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});


module.exports = router;
