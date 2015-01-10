var db = require('../db');

db.dbConnection.connect();

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (callback) {
      var queryString = "SELECT * FROM chat.messages";
      var queryArgs = [];
      var messages;
      db.dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) { throw err; }
        else {
          messages = results[0];
          // console.log(messages);
          callback(err, messages);
        }
      });
    },
    // a function which can be used to insert a message into the database
    post: function (data) {
      var message = JSON.parse(data);
      // Client side handles not allowing duplicate usernames
      var userQuery = "SELECT U_Id FROM chat.users WHERE name = ?";
      var queryArgs = [message.username];
      db.dbConnection.query(userQuery, queryArgs, function(err, results) {
        if (err) { throw err; }
        else {
          console.log('inside ');
          return results;
        }
      });
      var queryString = "INSERT into chat.messages (user_id, room_id, text)"; // ...
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

