# stadvdb-mco1
1. Install dependencies with `npm install`
2. Run `node app.js`
## Note: Make sure to set Safe Updates off before connecting to the local instance since the SQL file requires UPDATE and DELETE statements
1. Go to MySQL Workbench and Click Edit
2. Click on Preferences
3. Go to SQL Editor section
4. Uncheck Safe Updates (rejects UPDATEs and DELETEs with no restrictions)
5. Connect to localhost instance
6. Open and run pitchfork_unoptimized.sql