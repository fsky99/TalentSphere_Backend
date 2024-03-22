var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({ origin: "http://localhost:8100" }));
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));


// default route
app.get('/', function (req, res) {
      return res.send({ error: true, message: 'hello' })
});


var dbConn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "talent"
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
module.exports = app;