var models = require('../models');
var bluebird = require('bluebird');
var handler = require('../request-handler.js');


module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      var data;
      req.on('data', function() {
        data = JSON.stringify(models.messages.get());
      });
      req.on('end', function(){
        var statusCode = data ? 200 : 404;
        handler.sendResponse(statusCode, res, data, handler.headers);
      });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {

    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      var data;
      req.on('data', function() {
        data = JSON.stringify(models.users.get());
      });
      req.on('end', function(){
        var statusCode = data ? 200 : 404;
        handler.sendResponse(statusCode, res, data, handler.headers);
      });
    },
    post: function (req, res) {}
  }
};

