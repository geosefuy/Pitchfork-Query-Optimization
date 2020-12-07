/* Import statements */
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8080; 

const { home } = require('./routes/index');

// Don't forget to create the db here!
// Local DB connection
const db = mysql.createConnection({   
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3307,
    database: 'school'
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
app.use(express.urlencoded());
app.use(express.json()); // parse formdata client

// App routes
app.get('/', home);

// Set the port the app will listen on
app.listen(port, () => {
    console.log(`Proceed to http://localhost:${port} to view app.`);
});