'use strict';

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var routes = require('./public/routes.js');
var api = require('./public/api.js');
var log = require('npmlog');


var app = express();

var fileSchema = new Schema({
  name: String,
  size: Number,
  date: String
});

var File = mongoose.model('File', fileSchema);

var MONGO_URI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017';
mongoose.connect(MONGO_URI);

  app.use('/', express.static(process.cwd() + '/public'));

  routes(app);
 api(app, File);

  var port = process.env.PORT || 3000;
  app.listen(port, function() {
    log.info('Express', 'Listening on port %s', port);
  });