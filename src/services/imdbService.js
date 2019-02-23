function imdbService(){
    function getMovieById(){
        return new Promise((resolve, reject) => {
            resolve({ description: 'sample description'})

        });
    }
    return {
        getMovieById
    };
}

module.exports = imdbService();