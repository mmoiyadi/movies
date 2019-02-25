const request = require('request-promise');
const debug = require('debug')('app');

function imdbService(){
    function getMovieById(title){
        return new Promise((resolve, reject) => {
            //request(http://omdbapi.com/?apikey=1967b0f0&t=%22The%20Dark%20Knight%22')
            request(`http://omdbapi.com/?apikey=1967b0f0&t=${title}`)
            .then((response) => {
                debug(response);
                var details = JSON.parse(response)
                resolve({ description: details.Plot,
                          imageUrl: details.Poster});
            })
            .catch((error) => {
                reject(error);
                debug(error);
            });
        });
    }
    return {
        getMovieById
    };
}

module.exports = imdbService();