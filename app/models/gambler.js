'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

function Gambler(obj){
  this.name   = obj.name;
  this.spouse = obj.spouse;
  this.assets = [];
  this.results = {wins:0, losses:0};
  this.photo = obj.photo;
  this.cash   = parseFloat(obj.cash);
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(function(err, gamblers) {
    gamblers = gamblers.map(function(gambler){
      return changePrototype(gambler);
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

Gambler.prototype.removeAsset = function(name) {
 console.log('Gambler.prototype.removeAsset');
 console.log(name);
 console.log(this.assets);
 if(!this.assets.length){return;}
   var sold = _.remove(this.assets, function(asset){
     console.log(asset);
    return asset.name === name;
   });
   this.cash += sold[0].value;
};

Gambler.prototype.addAsset = function(obj, cb){
  obj.name = obj.name;
  obj.photo = obj.photo;
  obj.value = parseInt(obj.value);
  this.assets.push(obj);
  this.save(cb);
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
