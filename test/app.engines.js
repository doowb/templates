/* deps: mocha */
var path = require('path');
var assert = require('assert');
var should = require('should');
var App = require('../');
var app;

describe('engines', function () {
  describe('constructor', function () {
    it('should create an instance of App:', function () {
      app = new App();
      assert(app instanceof App);
    });
  });

  describe('static methods', function () {
    it('should expose `extend`:', function () {
      assert(typeof App.extend ==='function');
    });
  });

  describe('prototype methods', function () {
    beforeEach(function() {
      app = new App();
    });

    it('should expose `set`', function () {
      assert(typeof app.set ==='function');
    });
    it('should expose `get`', function () {
      assert(typeof app.get ==='function');
    });
    it('should expose `visit`', function () {
      assert(typeof app.visit ==='function');
    });
    it('should expose `define`', function () {
      assert(typeof app.define ==='function');
    });
    it('should expose `engine`', function () {
      assert(typeof app.engine ==='function');
    });
  });

  describe('instance', function () {
    beforeEach(function() {
      app = new App();
    });

    it('should set an arbitrary value on the instance:', function () {
      app.set('a', 'b');
      assert(app.a ==='b');
    });

    it('should get an arbitrary value from the instance:', function () {
      app.set('a', 'b');
      assert(app.get('a') ==='b');
    });
  });

  describe('engines', function() {
    beforeEach(function() {
      app = new App();
    });

    it('should throw an error when engine name is invalid:', function () {
      (function () {
        app.engine(null, {});
      }).should.throw('expected engine ext to be a string or array.');
    });

    it('should register an engine to the given extension', function () {
      app.engine('hbs', function () {});
      assert(typeof app.engines['.hbs'] === 'object');
    });

    it('should get an engine:', function () {
      app.engine('hbs', function () {});
      var hbs = app.engine('hbs');
      assert(typeof hbs === 'object');
      assert(hbs.hasOwnProperty('render'));
      assert(hbs.hasOwnProperty('compile'));
    });

    it('should register multiple engines to the given extension', function () {
      app.engine(['hbs', 'md'], function () {});
      assert(typeof app.engines['.hbs'] === 'object');
      assert(typeof app.engines['.md'] === 'object');
    });
  });
});

