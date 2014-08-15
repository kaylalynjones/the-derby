'use strict';
var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(gamblers){
    console.log(gamblers);
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.init = function(req,res){
  res.render('gamblers/init');
};

exports.create = function(req, res){
  var gambler = new Gambler(req.body);
  gambler.save(function(){
    res.redirect('/gamblers');
  });
};

exports.show = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    res.render('gamblers/show', {gambler:gambler});
  });
};

exports.initAsset = function(req,res){
  res.render('gamblers/asset_init', {id:req.params.id});
};

exports.addAsset = function(req,res){
  Gambler.findById(req.params.id, function(gambler){
    gambler.addAsset(req.body, function(){
      res.redirect('/gamblers/'+req.params.id);
    });
  });
};

exports.removeAsset = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    gambler.removeAsset(req.params.name, function(isDivorced){
      // res.send({id:req.params.id, name:req.params.name, isDivorced:isDivorced, cash:gambler.cash});
      res.send({gambler: gambler});
    });
  });
};
