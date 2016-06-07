var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');

module.exports = {

  addUser : function(username, password, email, callback){
    // hashing password
    var hash = hashPassword(password);

    //define user
    var user = {
      'username': username,
      'password': hash,
      'email': email,
    }

    // insert to db
    mongoConnect(function(err, db) {
      var users = db.collection('users');
      users.insert(user, function(err, result) {
        db.close();
        console.log("user " + username + " added");
        callback(err);
      });
    });
  },

  getUserInfo : function(username, callback) {

    // fetch user
    mongoConnect(function(err, db) {
      var users = db.collection('users');
      users.findOne({'username':username},{'_id':0,'password':0}, function(err, user) {
        db.close();
        console.log("user " + username + " found");
        callback(err, user);
      });
    });
  },

  authenticate : function(username, password, callback) {

    // fetch user
    mongoConnect(function(err, db) {
      var users = db.collection('users');
      users.findOne({'username':username},{'_id':0}, function(err, user) {
        db.close();
        callback(err, verifyPassword(password,user.password));
      });
    });
  }

}

function mongoConnect(callback) {
  MongoClient.connect('mongodb://localhost:27017/test', callback);
}

function hashPassword(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function verifyPassword(plainPassword, hash) {
  return bcrypt.compareSync(plainPassword, hash);
}
