const express = require('express');
const movieRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app');

function router(nav){
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
    
    movieRouter.route('/')
    .get((req,res) => {
        (async function query (){
            const request = new sql.Request();
            const {recordset} = await request.query('select * from movies');
            debug(recordset);
            res.render(
                'movieListView', 
                { 
                    nav, 
                    title: 'My Movies',
                    movies: recordset
                });
        }());
    });
    movieRouter.route('/:id').get((req,res) => {
        (async function query(){
            const {id} = req.params;
            const request = new sql.Request();
            const {recordset} = await request.input('id', sql.Int, id)
            .query('select * from movies where id=@id');
            debug(recordset);
            res.render(
                'movieView', 
                { 
                    nav, 
                    title: 'My Movies',
                    movie: recordset[0]
                });
    }());
        
    });
    return movieRouter;
}



module.exports = router;