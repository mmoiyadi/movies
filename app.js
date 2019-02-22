const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
    user: 'mmoiyadi',
    password: 'Real$123',
    server: 'mmmovies.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'MMMovies',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

sql.connect(config).catch(err => debug(err));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');

const nav =  [
    {title: 'Movies', link:'/movies'},
    {title: 'Directors', link: '/directors'}
]; 

const movieRouter = require('./src/routes/movieRoute')(nav);
 
app.use('/movies',movieRouter);

app.get("/", function (req, res) {
    //res.sendFile(path.join(__dirname, 'views/index.html'));
    res.render(
        'index', 
        { 
            nav: [{title: 'Movies',link:'/movies'},
                  {title: 'Directors', link: '/directors'}], 
            title: 'My Movies'});
});

app.listen(port, function () {
    debug(`listening at port ${chalk.green(port)}`);
});