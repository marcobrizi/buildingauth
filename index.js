var bcrypt = require('bcrypt');

module.exports = function(opts) {
    var db = opts.db;
    return {
        addUser: function(username, password, email, callback) {
            // hashing password
            var hash = hashPassword(password);

            //define user
            var user = {
                'username': username,
                'password': hash,
                'email': email,
            }

            // insert to db
            var users = db.collection('users');
            users.insert(user, function(err, result) {
                console.log('user ' + username + ' added');
                callback(err);
            });
        },

        getUserInfo: function(username, callback) {

            // fetch user
            var users = db.collection('users');
            users.findOne({
                'username': username
            }, {
                '_id': 0,
                'password': 0
            }, function(err, user) {
                console.log('user ' + username + ' found');
                callback(err, user);
            });
        },

        authenticate: function(username, password, callback) {
            // fetch user
            var users = db.collection('users');
            users.findOne({
                'username': username
            }, {
                '_id': 0
            }, function(err, user) {
                callback(err, verifyPassword(password, user.password));
            });
        }
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
