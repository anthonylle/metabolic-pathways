const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const spawn = require("child_process").spawn;


const mongoURI = 'mongodb://localhost:27017/MEAN';//
const mainDB = 'MEAN'

// connection from mongodb console
//    mongo ds137291.mlab.com:37291/heroku_1lnxd10m -u heroku_1lnxd10m -p h16ioa5tul5q9ofvae2onnb00
// const mongoURI = 'mongodb://heroku_1lnxd10m:h16ioa5tul5q9ofvae2onnb00@ds137291.mlab.com:37291/heroku_1lnxd10m';
// const mainDB = 'heroku_1lnxd10m';

//router.use(bodyParser.json());

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
/*router.get('/users', (req, res) => {
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
});*/

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
        const filename = file.originalname;//buf.toString('hex') + path.extname(file.originalname);
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

router.get('/users', (req, res) =>{
  conn.db.collection('users', function (err, collection) {
    collection.find({}).toArray(function(err, data){
      response.data = data;
      res.json(response);
    })
  });
});

// @route POST upload
// @description Uploads file to DB
router.post('/upload', upload.single('file'), (req, res) => {
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
    response.data = files;
    return res.json(files);//response);//files);
  });
});

// @route DELETE //file
router.delete('/delete/:filename', (req, res) =>{
  const filename = req.params.filename;
  conn.db.collection('files', function(err, collection) {
    if (err){
      res.send(err);
    }else{
      collection.deleteOne({filename: filename}).toArray(function(err, data){
        if (err)
          res.send(err);
        else
          res.send(data);
      });
    }
  });
});

// function attached to
const callPython = function(args){ //['path', args...]
  return new Promise(function(success, nosuccess) {

    const { spawn } = require('child_process');
    const pyprog = spawn('python', args); //args [path]

    pyprog.stdout.on('data', function(data) {
      success(data);
    });

    pyprog.stderr.on('data', (data) => {
      nosuccess(data);
    });
  });
};

router.get('/python/', (req, res) => {
  callPython(['./python/NewMain.py', 'ko00010.xml', 'hsa00260.xml', '1']).then(fromCallBack => {
    console.log(fromCallBack.toString());
    res.end(fromCallBack);
  }).catch(err => {
    res.end(err);
  });
});

// Export this module
module.exports = router;
