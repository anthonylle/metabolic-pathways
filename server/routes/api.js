const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const mongoURI = 'mongodb://localhost:27017/MEAN';//'mongodb://heroku_1lnxd10m:h16ioa5tul5q9ofvae2onnb00@ds137291.mlab.com:37291/heroku_1lnxd10m';
router.use(bodyParser.json());

// Connect
const connection = function(closure) {
  return MongoClient.connect(mongoURI, function(err, db) {//'mongodb://heroku_1lnxd10m:h16ioa5tul5q9ofvae2onnb00@ds137291.mlab.com:37291/heroku_1lnxd10m', function(err, db) {
    if (err) return console.log(err);
    const dbo = db.db('MEAN');
    closure(dbo);
  });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling - this is generic and can be customized for each response from server at the router handling
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

// just another connection using the mongoose controller
// TODO check if this collapses while trying to access the DB by using both MongoClient and mongoose
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads')
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });


// @route POST upload
// @description Uploads file to DB
router.post('/upload', upload.single('files'), (req, res) => {
  res.json({file: req.file});
});


// @route GET /files
// @description display all files in json
router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if there are not files to retrieve
    if(!files || files.length === 0){
      return res.status(404).json({
        err: 'No existing files to retrieve'
      });
    }
    // Files exists
    return res.json(files);
  });
});




// Export this module
module.exports = router;
