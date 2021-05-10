var http = require('http');
var path = require('path');
var db = require('./routes.js')
var bodyParser = require('body-parser');

var express = require('express');
var app = express();
var server = http.createServer(app);
// TAI SAO 
const port = process.env.PORT || 5000;
// app.use(express.static(path.resolve(__dirname + './..', 'views')));
server.listen(port, "0.0.0.0", function () {
        var addr = server.address();
        console.log("All ready! server is listening at", addr.address + ":" + addr.port);
});

app.use(bodyParser.json());
// connect to sql server


app.post('/users', db.FINDUSER);//ending post method

app.post('/users1', db.CREATEUSER);//ending post method






// app.post('/users/:id',db.test);

