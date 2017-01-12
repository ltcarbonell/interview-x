// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var mysql      = require('mysql');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'soccer_app'
});
var app = express();

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

/* Routes */
app.get('/api/standings', function(req, res) {
  console.log("Api touched");
  connection.query('SELECT * FROM standings ORDER BY points DESC', function(err, rows, fields) {
    if (!err) {
      console.log('The solution is: ', rows);
      res.json(rows);
    }
    else {
      throw err;
    }
  });
})

app.get('/api/standings', function(req, res) {
  console.log("Api touched");
  connection.query('SELECT * FROM standings ORDER BY points DESC', function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    }
    else {
      throw err;
    }
  });
})

app.get("",function(req,res){
  res.sendFile('index.html', {root: "./public"}); // load the single view file (angular will handle the page changes on the front-end)
});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.listen(3000);
console.log("App listening on port 3000");
