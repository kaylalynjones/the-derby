/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gamblers    = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'gambling';

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

