const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs = require("fs");

/*
const mongoURI = 'mongodb://localhost:27017/MEAN';//
const mainDB = 'MEAN'
*/

// connection from mongodb console
//    mongo ds137291.mlab.com:37291/heroku_1lnxd10m -u heroku_1lnxd10m -p h16ioa5tul5q9ofvae2onnb00


const mongoURI = 'mongodb://heroku_1lnxd10m:h16ioa5tul5q9ofvae2onnb00@ds137291.mlab.com:37291/heroku_1lnxd10m';
const mainDB = 'heroku_1lnxd10m';


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

router.get('/users', (req, res) =>{
  conn.db.collection('users', function (err, collection) {
    collection.find({}).toArray(function(err, data){
      response.data = data;
      res.json(response);
    })
  });
});

// function attached to
const callPython = function(args){ //['path', args...]
  return new Promise(function(success, noSuccess) {

    const { spawn } = require('child_process');
    const pyprog = spawn('python', args); //args [path]

    pyprog.stdout.on('data', function(data) {
      success(data);
    });

    pyprog.stderr.on('data', (data) => {
      noSuccess(data);
    });
  });
};

router.get('/python/', (req, res) => {
    callPython(['./python/Main.py', "cit00710.xml","C1"]).then(fromCallBack => {
    console.log(fromCallBack.toString());
    res.end(fromCallBack);
  }).catch(err => {
    res.end(err);
  });
});

router.post('/python', (req, res) => {
  //const args = ['./python/Main.py', req.body.file, req.body.tipo];
  const args = ['./python/Main.py'];
  const algorithmCodes = ["A1", "A1T1", "A1T2", "A1T3", "A1T4", "A1T5"];//, "A2"];
  if(algorithmCodes.includes(req.body.code)){
    args.push(req.body.pathwayGraph1);
    args.push(req.body.pathwayGraph2);
    switch(req.body.code){
      case "A1":
        break;
      case "A1T1":
        break;
      case "A1T2":
        args.push(req.body.startNodeGraph1);
        args.push(req.body.startNodeGraph2);
        break;
      case "A1T3":
        args.push(req.body.startNodeGraph1);
        args.push(req.body.startNodeGraph2);
        args.push(req.body.endNodeGraph1);
        args.push(req.body.endNodeGraph2);
        break;
      case "A1T4":
        args.push(req.body.startNodeGraph1);
        args.push(req.body.startNodeGraph2);
        args.push(req.body.endNodeGraph1);
        args.push(req.body.endNodeGraph2);
        break;
      case "A1T5":
        args.push(req.body.endNodeGraph1);
        args.push(req.body.endNodeGraph2);
        break;
      /*case "A2":
        break;*/
    }
    args.push(req.body.match);
    args.push(req.body.missmatch);
    args.push(req.body.gap);
  }
  if(["C1"].includes(req.body.code))
    args.push(req.body.filename);

  args.push(req.body.code);
  console.log("Args: ");
  console.log(args);

  callPython(args).then(fromCallBack => {
    res.end(fromCallBack);
  }).catch(err => {
    console.log("Fail response from Python");
    res.end(err);
  });
});

// SET STORAGE
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp_uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const uploadLocal = multer({ storage: localStorage })

router.post('/copyKGMLToTempUploads', uploadLocal.single('file'),(req,res, next) =>{
  const buffer = Buffer.from(req.files.file.data).toString();
  const filename = req.files.file.name.replace('.xml', '') + '-'+ Date.now();
  if (!req) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  const wStream = fs.createWriteStream('temp_uploads/'+filename+ '.xml');
  wStream.write(buffer);
  wStream.end();
  res.send({filename});
});



// Export this module
module.exports = router;
