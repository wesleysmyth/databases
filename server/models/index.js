var db = require('../db');

db.dbConnection.connect();

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (callback) {
      var queryString = "SELECT * FROM chat.messages";
      var queryArgs = [];
      db.dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) { throw err; }
        else {
          callback(err, results);
        }
      });
    },
    // a function which can be used to insert a message into the database
    post: function (data, callback) {
      // Client side handles not allowing duplicate usernames
      var user_id;
      var room_id;
      var userQuery = "SELECT U_Id FROM chat.users WHERE name = ?";
      var userArgs = [data.username];
      db.dbConnection.query(userQuery, userArgs, function(err, results) {
        if (err) { callback(err); }
        else {
          user_id = results[0].U_Id;
          var roomQuery = "SELECT R_Id FROM chat.rooms WHERE name = ?";
          var roomArgs = [data.roomname];
          db.dbConnection.query(roomQuery, roomArgs, function(err, results) {
            if (err) { callback(err); }
            else {
              room_id = results[0].R_Id;
              var queryString = "INSERT into chat.messages (user_id, room_id, text) VALUES (?, ?, ?)";
              var queryArgs = [user_id, room_id, data.text];
              db.dbConnection.query(queryString, queryArgs, function(err, results) {
                if (err) { callback(err); }
                else {
                  console.log('message inserted into database');
                  var messageQuery = "SELECT M_Id FROM chat.messages ORDER BY M_Id DESC LIMIT 1;";
                  var messageArgs = [];
                  var room_id = db.dbConnection.query(messageQuery, messageArgs, function(err, results) {
                    if (err) { callback(err); }
                    else {
                      data.objectId = results[0].M_Id;
                      callback(err, data);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {
      var queryString = "SELECT * FROM chat.users";
      var queryArgs = [];

      db.dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) { throw err; }
        else {
          return results;
        }
      });
    },
    post: function (data) {

    }
  }
};

