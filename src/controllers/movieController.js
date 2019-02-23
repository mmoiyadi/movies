const {MongoClient, ObjectID} = require('mongodb');
const debug = require('debug')('app');

function movieController( movieService, nav){
    function getIndex(req, res){
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
        
    }
    function getById(req, res){
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

                movie.details = await movieService.getMovieById();
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

    }

    function middleware(req, res, next){
        if(req.user){
            debug('USER FOUND');
            next();
        }
        else{
            res.redirect('/');
        }
    }

    return {
        getIndex,
        getById,
        middleware
    };
}

module.exports = movieController;