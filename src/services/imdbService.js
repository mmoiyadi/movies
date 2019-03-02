const request = require('request-promise');
const debug = require('debug')('app');
const imdb = require('imdb-api');

function imdbService(){
    function getMovieByTitle(title){
        return new Promise((resolve, reject) => {
            //request(http://omdbapi.com/?apikey=1967b0f0&t=%22The%20Dark%20Knight%22')
            request(`http://omdbapi.com/?apikey=1967b0f0&t=${title}`)
            .then((response) => {
                debug(response);
                //////////////////////////////////
                imdb.search({
                    name: 'Christopher Nolan'
                  }, {
                    apiKey: '1967b0f0'
                    ///SearchResults.results[0].SearchResult.title
                  }).then((res2) => {
                    debug(res2.results[0].title);
                    }).catch((err) => {debug(err);});
                  ///////////////////////////
                var details = JSON.parse(response)
                resolve({ description: details.Plot,
                          imageUrl: details.Poster,
                          imdbId: details.imdbID
                        });
            })
            .catch((error) => {
                reject(error);
                debug(error);
            });
        });
    }
    function getMovieById(id){
      return new Promise((resolve, reject) => {
          //request(http://omdbapi.com/?apikey=1967b0f0&t=%22The%20Dark%20Knight%22')
          request(`http://omdbapi.com/?apikey=1967b0f0&i=${id}`)
          .then((response) => {
              debug(response);
              //////////////////////////////////
              imdb.search({
                  name: 'Christopher Nolan'
                }, {
                  apiKey: '1967b0f0'
                  ///SearchResults.results[0].SearchResult.title
                }).then((res2) => {
                  debug(res2.results[0].title);
                  }).catch((err) => {debug(err);});
                ///////////////////////////
              var details = JSON.parse(response)
              resolve({ description: details.Plot,
                        imageUrl: details.Poster,
                        imdbId: details.imdbID
                      });
          })
          .catch((error) => {
              reject(error);
              debug(error);
          });
      });
  }
    return {
        getMovieById,
        getMovieByTitle
    };
}

module.exports = imdbService();