const express = require('express');
const bodyParser = require('body-parser');
const path =require('path');
const http = require('http');
const app = express();
const fileUpload = require("express-fileupload");


// API file for interacting with MongoDB
const api = require('./server/routes/api');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

// Parsers
app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other request to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/metabolic-pathways/index.html'));//"./test.html"));//
});

// Initialize the server
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

