const performance = require('perf_hooks').performance;
module.exports = {
    loadPageOne: (req, res) => {
        res.render('one_table.ejs', { // Pass data to front end
            title: "One Table Query",
            result1: false,
            result2: false,
            time: false
        });
    },
    oneQuery1: (req, res) => {
        //query here
        let score = req.body.query1;
        let query = `SELECT r.pub_year, COUNT(r.title) albums
                        FROM reviews r
                        WHERE r.score >= ` + score + `
                        GROUP BY r.pub_year
                        ORDER BY r.pub_year`;
        console.log(query);
        let t0 = performance.now();
        db.query(query, (err, output) => {
            let time = performance.now() - t0;
            if (err) res.redirect('/');
            
            res.render('one_table.ejs', { // Pass data to front end
                title: "One Table Query 1", 
                result1: output,
                result2: false,
                time: time
            });
        });
    },
    oneQuery2: (req, res) => {
        //query here
        let day1 = req.body.query2_1;
        let day2 = req.body.query2_2;
        let query = `SELECT r.author_type, COUNT(r.author) authors
                        FROM reviews r
                        WHERE r.pub_weekday BETWEEN ` + day1 + ` AND ` + day2 + ` AND r.author_type <> ""
                        GROUP BY r.author_type`;
        console.log(query);
        let t0 = performance.now()
        db.query(query, (err, output) => {
            let time  = performance.now() - t0;
            if (err) res.redirect('/'); 

            res.render('one_table.ejs', { // Pass data to front end
                title: "One Table Query 2", 
                result1: false,
                result2: output,
                time: time
            });
        });
    },
}