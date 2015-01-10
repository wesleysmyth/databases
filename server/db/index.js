var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
});
