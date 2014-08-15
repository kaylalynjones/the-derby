'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

function Gambler(obj){
  this.name   = obj.name;
  this.spouse = {};
  this.assets = [];
  this.results = {wins:0, losses:0};
  this.photo = obj.photo;
  this.cash   = parseInt(obj.cash);
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(function(err, gamblers) {
    gamblers = gamblers.map(function(gambler){
      gambler = changePrototype(gambler);
    });
    cb(gamblers);
  });
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, gambler){
    gambler = changePrototype(gambler);
    cb(gambler);
  });
};

Gambler.prototype.removeAsset = function(name, cb) {
 if(!this.assets.length){return;}
   var index = _.findIndex(this.assets, function(asset){return asset.name === name;}),
       sold  = this.assets.splice(index, 1)[0];
       this.cash += sold.value;
  
  //var asset = _.find(this.assets, {name: name});
  //if (asset) {
    //this.cash += asset.value;
  //}

  //this.assets = _.remove(this.assets, function(asset){
    //return name === asset.name;
  //});
  //var isDivorced = this.assets.length < 1;

  //this.save(isDivorced, cb);
};

Gambler.prototype.addAsset = function(obj, cb){
  obj.name = obj.name;
  obj.photo = obj.photo;
  obj.value = parseInt(obj.value);

  this.assets.push(obj);
  cb();
};

Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, function(){
  cb();
  });
};


//private function
function changePrototype(obj) {
  var gamblers = _.create(Gambler.prototype, obj);
  return gamblers;
}

module.exports = Gambler;
