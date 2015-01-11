var http = require('http');
var models = require('../models');
var bluebird = require('bluebird');
var handler = require('../request-handler.js');


module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      // promisified models.messages.get in order to preserve order of async function calls
      var getMessagesPromise = bluebird.promisify(models.messages.get);
      getMessagesPromise()
      .then(function(obj) {
        var data = JSON.stringify(obj);
        handler.sendResponse(200, res, data, handler.headers);
      })
      .catch(function(err) {
        err = JSON.stringify(err);
        handler.sendResponse(404, res, err, handler.headers);
      });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      var postMessagePromise = bluebird.promisify(models.messages.post);
      req = req.body;
      postMessagePromise(req)
      .then(function(results) {
        results = JSON.stringify(results);
        handler.sendResponse(201, res, results, handler.headers);
      })
      .catch(function(err) {
        err = JSON.stringify(err);
        handler.sendResponse(404, res, err, handler.headers);
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // promisified models.users.get in order to preserve order of async function calls
      var getUsersPromise = bluebird.promisify(models.users.get);
      req = req.body;
      getUsersPromise()
      .then(function(results) {
        results = JSON.stringify(results);
        handler.sendResponse(200, res, results, handler.headers);
      })
      .catch(function(err) {
        err = JSON.stringify(err);
        handler.sendResponse(404, res, err, handler.headers);
      });
    },
    post: function (req, res) {
      console.log('post in controllers');
      var postUserPromise = bluebird.promisify(models.users.post);
      req = req.body;
      postUserPromise(req)
      .then(function(results) {
        results = JSON.stringify(results);
        handler.sendResponse(201, res, results, handler.headers);
      })
      .catch(function(err) {
        err = JSON.stringify(err);
        handler.sendResponse(404, res, err, handler.headers);
      });
    }
  }
};

