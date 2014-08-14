'use strict';
var Mongo = require('mongodb');
function Gambler(){
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, gambler){
    cb(gambler);
  });
};

Gambler.save = function(cb){
  Gambler.collection.save(result, function(){
  cb(result);
  });
};

module.exports = Gambler;
