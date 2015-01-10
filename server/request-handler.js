var url = require('url');
var path = require('path');
var fs = require('fs');

exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,  // Seconds.
  "Content-Type": "application/json"
};

exports.sendResponse = function(statusCode, response, data, headers) {
  response.writeHead(statusCode, headers);
  response.end(data);
};
exports.fileHandler = function(request, response) {
  // Supported file types
  var extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg"
  };

  var fileName = request.url;
  var localFolder = '../../2014-12-chatterbox-client/client';
  var pathName = url.parse(request.url).pathname;
  var ext = path.extname(fileName);
  if(pathName === '/') {
    fileName = '/index.html';
  }
  getFile((localFolder + fileName), response, extensions[ext]);

  function getFile(filePath, res, ext){
    //does the requested file exist?
    fs.exists(filePath,function(exists){
      //if it does...
      if(exists){
        //read the fiule, run the anonymous function
        fs.readFile(filePath,function(err,contents){
          if(!err){
            //if there was no error
            //send the contents with the default 200/ok header
            res.writeHead(200,{
              "Content-type" : ext,
              "Content-Length" : contents.length
            });
            res.end(contents);
          } else {
            //for our own troubleshooting
            console.dir(err);
          }
        });
      } else {
        //if the requested file was not found
        //serve-up our custom 404 page
        sendResponse(404, response, "404 Error");
      }
    });
  }
}

exports.messageHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var query = url.parse(request.url).query;
  var pathName = url.parse(request.url).pathname;
  var roomName = pathName.split('/')[2];
  if (request.method === 'GET') {
    handleGet();
  }

  if (request.method === 'POST') {
    request.on('data', function(message) {
      fs.readFile('data.txt', 'UTF-8', function(err, data) {
        if(err) throw err;
        if(!!data) {
          var previousData = data;
          var copy = JSON.parse(data).results;
        } else {
          var previousData = JSON.stringify({results: []});
          var copy = [];
        }
        copy.push(JSON.parse(message));
        var newData = JSON.stringify({results: copy});

        fs.writeFile('data.txt', newData, function(err) {
          if(err) throw err;
          console.log('data saved');
          sendResponse(201, response, previousData);
        });
      });
    });
  }

  if (request.method === 'OPTIONS') {
    sendResponse(200, response, "Options Sent");
  }

  function handleGet() {
    fs.readFile('data.txt', 'UTF-8', function(err, data) {
      if(err) throw err;
      if(!!data) {
        var copy = JSON.parse(data).results;
      } else {
        var copy = [];
      }
      if (!!query) {
        if (query.split('=')[1] === "-createdAt") {
          copy = copy.reverse();
        }
      }
      if (pathName === '/classes/messages') {
        sendResponse(200, response, JSON.stringify({results: copy}));
      }
      else if (pathName === '/classes/' + roomName) {
        var filtered = [];
        for (var i = 0; i < copy.length; i++) {
          if (copy[i].roomname === roomName) {
            filtered.push(copy[i]);
          }
        }
        sendResponse(200, response, JSON.stringify({results: filtered}));
      } else {
        sendResponse(404, response, "404 Error");
      }
    });
  }

};

