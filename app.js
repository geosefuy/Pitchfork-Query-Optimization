/* Import statements */
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8080; 

const { loadPageOne, oneQuery1, oneQuery2 } = require('./routes/one_table');
const { loadPageTwo, twoQuery1, twoQuery2 } = require('./routes/two_table');
const { loadPageThree, threeQuery1, threeQuery2 } = require('./routes/three_table');
const { loadPageFourSix, fourSixQuery } = require('./routes/four_six_table');

// Don't forget to create the db here!
// Local DB connection
const db = mysql.createConnection({   
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'northwind'
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log("Connected to database!");
});

// Setting a global instance of db for easy access
global.db = db;


// Config
app.set('port', process.env.port || port); // set express to use this port
app.set('view engine', 'ejs');             // configure template engine
app.set('views', __dirname + '/views');    // view folder config
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // parse formdata client

// App routes
app.get('/', loadPageOne);
app.get('/one_table', loadPageOne);
app.get('/one_table/getquery1', oneQuery1);
app.get('/one_table/getquery2', oneQuery2);
app.get('/two_table', loadPageTwo);
app.get('/two_table/getquery1', twoQuery1);
app.get('/two_table/getquery2', twoQuery2);
app.get('/three_table', loadPageThree);
app.get('/three_table/getquery1', threeQuery1);
app.get('/three_table/getquery2', threeQuery2);
app.get('/foursix_table', loadPageFourSix);
app.get('/foursix_table/getquery', fourSixQuery);

// Set the port the app will listen on
app.listen(port, () => {
    console.log(`Proceed to http://localhost:${port} to view app.`);
});