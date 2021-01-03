const performance = require('perf_hooks').performance;
module.exports = {
    loadPageThree: (req, res) => {
        res.render('three_table.ejs', { // Pass data to front end
            title: "Three Table Query",
            result1: false,
            result2: false,
            time: false
        });
    },
    threeQuery1: (req, res) => {
        //query here
        let year = req.body.query1;
        let query = `SELECT y.year, g.genre, ROUND(AVG(r.score), 2) avgScore, MAX(r.score) maxScore, MIN(r.score) minScore
                        FROM reviews r, years y, genres g
                        WHERE r.reviewid = y.reviewid AND r.reviewid = g.reviewid AND year = ` + year + `
                        GROUP BY y.year, g.genre`;
        console.log(query);
        let t0 = performance.now();
        db.query(query, (err, output) => {
            let time = performance.now() - t0;
            if (err) res.redirect('/');

            res.render('three_table.ejs', { // Pass data to front end
                title: "Three Table Query 1", 
                result1: output,
                result2: false,
                time: time
            });
        });
    },
    threeQuery2: (req, res) => {
        //query here
        let year = req.body.query2_1;
        let genre = req.body.query2_2;
        let query = `SELECT g.genre, y.year, r.* 
                        FROM reviews r, genres g, years y
                        WHERE r.reviewid = g.reviewid 
                        AND r.reviewid = y.reviewid 
                        AND r.pub_year = ` + year + ` 
                        AND y.year = ` + year + `
                        AND g.genre = '` + genre + `'
                        AND (g.genre, r.pub_month, r.pub_day) IN (
                        SELECT genre, pub_month, MAX(pub_day)
                            FROM reviews r, genres g
                            WHERE pub_year = ` + year + ` 
                        AND g.genre = '` + genre + `'
                        AND r.reviewid = g.reviewid
                            GROUP BY pub_month, genre
                        )
                        ORDER BY r.pub_month`;
        console.log(query);
        let t0 = performance.now();
        db.query(query, (err, output) => {
            let time = performance.now() - t0;
            if (err) res.redirect('/'); 

            res.render('three_table.ejs', { // Pass data to front end
                title: "Three Table Query 2", 
                result1: false,
                result2: output,
                time: time
            });
        });
    },
}