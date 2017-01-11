var express    = require("express");
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

app.get("/",function(req,res){
  connection.query('SELECT * from standings', function(err, rows, fields) {
    connection.end();
    if (!err)
    console.log('The solution is: ', rows);
    else
    console.log('Error while performing Query.');
  });
});

app.listen(3000);
