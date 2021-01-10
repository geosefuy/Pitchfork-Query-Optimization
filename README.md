# stadvdb-mco1

## Note: Make sure to run the SQL file first before opening the local instance
1. Open MySQL Workbench and execute the following commands
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
flush privileges;
```
2. Open and run pitchfork.sql

## Web Application
1. Install dependencies with `npm install`

3. Run `node app.js`
