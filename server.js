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
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

/* Routes */
app.get('/api/standings', function(req, res) {
  connection.query('SELECT * FROM standings ORDER BY points DESC', function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    }
    else {
      throw err;
    }
  });
})


app.get('/api/admin', function(req, res) {
  connection.query('SELECT team_id, name FROM standings', function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    }
    else {
      throw err;
    }
  });
})

app.post('/api/admin', function (req, res) {
  console.log(req.body);
  var team_id = req.body.team_id;
  var points = req.body.points;
  var win = req.body.win;
  var lose = req.body.lose;
  var draw = req.body.draw;

  var query = "update standings \
  set points = points + "+points+", won = won + "+win+", lost = lost + "+lose+", draw = draw + "+draw+"\
  where team_id = "+team_id+";"

  connection.query(query, function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    }
    else {
      throw err;
    }
  });

  console.log("Post to homepage")
  // res.send('POST request to homepage');
});

app.get("",function(req,res){
  res.sendFile('index.html', {root: "./public"}); // load the single view file (angular will handle the page changes on the front-end)
});

app.get("/admin",function(req,res){
  res.sendFile('admin.html', {root: "./public"}); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(3000);
console.log("App listening on port 3000");
