const express = require('express');
const adminRouter = express.Router();
const {MongoClient} = require('mongodb');
const debug = require('debug')('app');

const movies = [
    {
        title: 'The Dark Knight',
        genre: 'Superhero',
        director: 'Christopher Nolan',
        watched: false
    },
    {
        title: 'The Godfather',
        genre: 'Gangster',
        director: 'Francis Ford Coppola',
        watched: false
    },
    {
        title: 'The Social Network',
        genre: 'Biography',
        director: 'David Fincher',
        watched: false
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        genre: 'Fantasy',
        director: 'Peter Jackson',
        watched: false
    }
];

function router(nav){
    adminRouter.route('/')
    .get((req,res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'moviesApp';
        (async function mongo(){
            let client;
            try{
                client = await MongoClient.connect(url);
                debug('Connected to the server');
                
                const db = client.db(dbName);

                const response = await db.collection('movies').insertMany(movies);
                res.json(response);
            }catch(err){
                debug(err.stack);
            }

            client.close();
        }());
        
    });

    return adminRouter;
}

module.exports = router;
