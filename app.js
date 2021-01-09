/* Import statements */
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 8080; 

const { loadPageOne, oneQuery1, oneQuery2 } = require('./routes/one_table');
const { loadPageTwo, twoQuery1, twoQuery2 } = require('./routes/two_table');
const { loadPageThree, threeQuery1, threeQuery2, threeQuery2_opt } = require('./routes/three_table');
const { loadPageFourSix, fourSixQuery } = require('./routes/four_six_table');
const { createIndexAndLoadPage, dropIndexAndLoadPage } = require('./routes/index_control');

// Don't forget to create the db here!
// GCLOUD Deployment DB connection
// const db = mysql.createConnection({
//     user: process.env.CLOUD_SQL_USERNAME,
//     password: process.env.CLOUD_SQL_PASSWORD,
//     database: process.env.CLOUD_SQL_DATABASE_NAME,
//     socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
// });
// Local DB connection with CLOUD SQL
// const db = mysql.createConnection({
//     host: '34.87.150.174',
//     user: 'root',
//     password: '1234',
//     port: 3306,
//     database: 'pitchfork',
//     multipleStatements: true
// });
// Local DB connection with Local SQL 'pitchforks_unoptimized'
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'pitchfork_unoptimized',
    multipleStatements: true
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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // parse formdata client
app.set('trust proxy', true);

// App routes
app.get('/', loadPageOne);
app.get('/one_table', loadPageOne);
app.post('/one_table/getquery1', oneQuery1);
app.post('/one_table/getquery2', oneQuery2);
app.get('/two_table', loadPageTwo);
app.post('/two_table/getquery1', twoQuery1);
app.post('/two_table/getquery2', twoQuery2);
app.get('/three_table', loadPageThree);
app.post('/three_table/getquery1', threeQuery1);
app.post('/three_table/getquery2', threeQuery2);
app.post('/three_table/getquery2_opt', threeQuery2_opt);
app.get('/foursix_table', loadPageFourSix);
app.post('/foursix_table/getquery', fourSixQuery);

app.get("/create_index", createIndexAndLoadPage);
app.get("/drop_index", dropIndexAndLoadPage);

// Set the port the app will listen on
app.listen(port, () => {
    console.log(`Proceed to http://localhost:${port} to view app.`);
});