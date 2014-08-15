'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    home           = require('../controllers/home'),
    gambler        = require('../controllers/gambler');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/gamblers', gambler.index);
  app.get('/gamblers/new', gambler.init);
  app.post('/gamblers', gambler.create);
  app.get('/gamblers/:id', gambler.show);
  app.get('/gamblers/:id/assets/new', gambler.initAsset);
  app.post('/gamblers/:id/assets/new', gambler.addAsset);
  app.delete('gamblers/:id/assets/:name', gambler.removeAsset);

  console.log('Routes Loaded');
};

