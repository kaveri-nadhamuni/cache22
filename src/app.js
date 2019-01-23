const http  = require('http');
const bodyParser = require('body-parser');
const express = require('express');


//local dependencies
const views  = require('./routes/views')
const db = require('./db');
const api = require('./routes/api');

//initializes express app
const app = express();

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*// set up sessions
app.use(session({
    secret: 'session-secret',
    resave: 'false',
    saveUninitialized: 'true'
  }));*/

//set routes
app.use('/', views);
app.use('/api', api);
app.use('/static', express.static('public'));


//404 route - access route that does not exist
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//route error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send({
        status: err.status,
        message: err.message,
    });
});

//defines what port server is listening on 
const port = 3000;
const server = http.Server(app);
server.listen(port, function() {
    console.log('Server listening on port: ' + port); //function executed when server is started up
});


