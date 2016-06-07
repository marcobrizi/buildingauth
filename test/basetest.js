var tap = require('tap');
var build = require('../index');
var clean = require('mongo-clean');

var url = 'mongodb://localhost:27017/test';

clean(url, function(err, db) {
    tap.tearDown(db.close.bind(db));

    var auth = build({
        db
    });

    auth.addUser('marco', 'passwd', 'marco.brizi@gmail.com', (err) => {
        tap.error(err);

        auth.getUserInfo('marco', function(err, user) {
            tap.error(err);
            tap.equal(user.email, 'marco.brizi@gmail.com');
            tap.equal(user.password, undefined);

            auth.authenticate('marco', 'passwd', function(err, result) {
                tap.error(err);
                tap.equal(result, true);

                tap.end();

            });

        });
    });
})






//tap.equal(auth.authenticate('marco','passwd'),true);
//tap.equal(auth.authenticate('marco','passwd2'),false);
