const express = require('express');
const authRouter = express.Router();
const {MongoClient} = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app');

function router(nav){
    authRouter.route('/signUp')
        .post((req, res) => {
            debug(req.body);
            // create user
            const {username, password } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbName = 'moviesApp';

            (async function addUser(){
                let client;
                try{
                    client = await MongoClient.connect(url);
                    debug('Connected correctly to server');

                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = {username, password};

                    const results = await col.insertOne(user);
                    debug(results);
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                }catch(err){
                    debug(err.stack);
                }
            }());
            
        });
        authRouter.route('/profile')
            .all((req, res, next) => {
                if(req.user){
                    next();
                }else{
                    res.redirect('/');
                }
            })
            .get((req,res) => {
                res.json(req.user);
            });
        
        authRouter.route('/signin')
            .get((req, res) => {
                res.render('signin', {
                    nav,
                    title: 'Sign In' 
                });
            })
            .post(passport.authenticate('local',{
                successRedirect: '/auth/profile',
                failureRedirect: '/'
            }));

    return authRouter;
}

module.exports = router;