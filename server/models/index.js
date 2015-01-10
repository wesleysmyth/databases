var db = require('../db');
db.dbConnection.connect();



module.exports = {
  messages: {
    get: function () {
      var queryString = "SELECT * FROM messages";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) { throw err; }
        else {
          return results;
        }
      });
    }, // a function which produces all the messages
    post: function (data) {
      var message = JSON.parse(data);
      // Client side handles not allowing duplicate usernames
      var userQuery = "SELECT U_Id FROM users where name = " + message.username;
      var queryArgs = [];
      dbConnection.query(userQuery, queryArgs, function(err, results) {
        if (err) { throw err; }
        else {
          return results;
        }
      });
      var queryString = "INSERT into messages (user_id, room_id, text) VALUES " +
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      var queryString = "SELECT * FROM users";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) { throw err; }
        else {
          return results;
        }
      });
    },
    post: function () {}
  }
};

