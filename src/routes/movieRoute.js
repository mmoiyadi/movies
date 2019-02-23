const express = require('express');
const {MongoClient, ObjectID} = require('mongodb');
const debug = require('debug')('app');

const movieRouter = express.Router();

function router(nav){
    
    movieRouter.route('/')
    .get((req,res) => {

        const url = 'mongodb://localhost:27017';
        const dbName = 'moviesApp';
        (async function mongo(){
            let client;
            try{
                client = await MongoClient.connect(url);
                debug('Connected to the server');
                
                const db = client.db(dbName);

                const col = await db.collection('movies');
                debug('collection ' + col);
                const movies = await col.find({}).toArray();
                
                debug('movies ' + movies[0]);
                res.render(
                    'movieListView', 
                    { 
                        nav, 
                        title: 'My Movies',
                        movies
                    });
                }catch(err){
                    debug(err.stack);
                }
                client.close();
 
            }());
    });
    movieRouter.route('/:id').get((req,res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'moviesApp'; 
        const {id} = req.params;

        (async function mongo(){
            let client;
            try{
                client = await MongoClient.connect(url);
                debug('Connected to the server');
                
                const db = client.db(dbName);

                const col = await db.collection('movies');
                
                const movie = await col.findOne({_id: new ObjectID(id) });
                debug(movie);
                res.render(
                    'movieView',
                    {
                        nav,
                        title: 'My Movies',
                        movie
                    }
                )
            }catch(err){
                debug(err.stack);
            }
            client.close();
        }());
        
    });
    return movieRouter;
}



module.exports = router;