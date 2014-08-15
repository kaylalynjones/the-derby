/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler    = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'gambling',
    Mongo     = require('mongodb'),
    f;


describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      f = {
        name: 'Jill Bean', 
        spouse: {
          name:'Jim Bean', 
          photo:'picture.png'
        }, 
        photo:'anotherpicture.png', 
        cash:40000, 
        assets:[{
            name:'dog', 
            photo:'dog.png', 
            value:'500'
          },
          {
            name:'Jetski', 
            photo:'jetski.png', 
            value:1300
          }
        ],
        results:{
          wins:6, losses:8
        }
      };
      var g = new Gambler(f);
      expect(g).to.be.instanceof(Gambler);
      expect(g.cash).to.equal(40000);
      expect(g.name).to.equal('Jill Bean');
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a gambler by his id', function(done){
      var id = '000000000000000000000001';
      Gambler.findById(id, function(gambler){
        expect(gambler.name).to.equal('Bob Jones');
        done();
      });
    });
  });

  describe('#save', function(){
    it('should save/update a gambler', function(done){
      f = {
        name: 'Jill Bean',
        spouse: {
          name:'Jim Bean',
          photo:'picture.png'
        },
        photo:'anotherpicture.png',
        cash:40000,
        assets:[{
            name:'dog',
            photo:'dog.png',
            value:'500'
          },
          {
            name:'Jetski',
            photo:'jetski.png',
            value:1300
          }
        ],
        results:{
          wins:6, losses:8
        }
      };
      var gambler = new Gambler(f);
      gambler.save(function(){
        console.log(gambler);
        expect(gambler._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('#addAsset', function(){
    it('should add an asset to a gambler', function(done){
      var id = '53ed57cef991a32617e5960e',
          obj = {name:'Television', photo:'television.png', value:'600'};
      Gambler.findById(id, function(gambler){
        gambler.addAsset(obj, function(){
          Gambler.findById(id, function(newGambler){
            expect(gambler.asset.length).to.be.below(newGambler.asset.length);
            expect(gambler.asset.value).to.equal(600);
            done();
          });
        });
      });
    });
  });

  describe('#removeAsset', function(){
    it('should remove an asset', function(done){
      var id = '53ed57cef991a32617e5960e';
      Gambler.findById(id, function(gambler){
        gambler.removeAsset('Jetski', function(){
          Gambler.findById(id, function(newGambler){
            expect(newGambler.assets.length).to.be.below(gambler.assets.length);
            done();
          });
        });
      });
    });
  });
});

