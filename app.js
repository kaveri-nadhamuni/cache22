const http  = require('http');
const express = require('express');

//initializes express app
const app = express();

app.use('/static', express.static('public'));

app.get('/', function(req,res) {
    res.sendFile('index.html', {roots: 'src/views'})
})

const port = 3000;
const server = http.Server(app);
server.listen(port, function() {
    console.log('Server listening on port: ' + port); //function executed when server is started up
});