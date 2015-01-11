/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var users = sequelize.define('users', {
  U_Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
});

var messages = sequelize.define('messages', {
  M_Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: Sequelize.INTEGER,
  room_id: Sequelize.INTEGER,
  text: Sequelize.STRING
});

var rooms = sequelize.define('rooms', {
  R_Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
});

console.log(sequelize);

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
users.sync();
// .success(function() {
//   /* This callback function is called once sync succeeds. */

//   // now instantiate an object and save it:
//   var newUser = users.build({name: "Jean Valjean"});
//   newUser.save().success(function() {

//     /* This callback function is called once saving succeeds. */

//     // Retrieve objects from the database:
//     users.findAll({ where: {name: "Jean Valjean"} }).success(function(usrs) {
//       // This function is called back with an array of matches.
//       for (var i = 0; i < usrs.length; i++) {
//         console.log(usrs[i].name + " exists");
//       }
//     });
//   });
// });
rooms.sync().success(function(){
  rooms.build({name: 'lobby'}).save();
});

messages.sync();

