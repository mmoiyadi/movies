const passport = require('passport');
const {Strategy} = require('passport-local');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app');

module.exports = function localStrategy(){
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'moviesApp';
            (async function mongo(){
                let client;
                try{
                    client = await MongoClient.connect(url);

                    debug('Connected correctly to server');

                    const db = client.db(dbName);
                    const col = db.collection('users'); 

                    const user = await col.findOne( {username} );
                    debug('username '+ username);
                    debug(user);
                    if(user.password === password){
                        done(null, user);
                    }else{
                        done(null, false);
                    }

                }catch(err){
                    debug(err.stack);
                }
                client.close();
            }());
            
        }
    ));
};