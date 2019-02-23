const express = require('express');
const movieController = require('../controllers/movieController.js');

const movieRouter = express.Router();
const movieService = require('../services/imdbService.js');
function router(nav){
    const { getIndex, getById, middleware} = movieController(movieService, nav);
    movieRouter.use(middleware)
    
    movieRouter.route('/')
        .get(getIndex);

    movieRouter.route('/:id')
        .get(getById);

    return movieRouter;
}



module.exports = router;