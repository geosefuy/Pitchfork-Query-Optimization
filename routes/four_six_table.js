module.exports = {
    loadPageFourSix: (req, res) => {
        res.render('four_six_table.ejs', { // Pass data to front end
            title: "Four to Six Table Query",
            results: false
        });
    },
    fourSixQuery: (req, res) => {
        //query here
        let month = req.body.query_1;
        let year = req.body.query_2;
        let yearminus = (Number(year) - 1).toString()
        let query = `SELECT r.title, r.artist, l.label, g.genre, y.year, r.score, r.pub_date
                        FROM reviews r, labels l, genres g, years y
                        WHERE r.reviewid = l.reviewid 
                        AND r.reviewid = g.reviewid 
                        AND r.reviewid = y.reviewid 
                        AND r.pub_month = ` + month + ` 
                        AND r.pub_year = ` + year + ` 
                        AND y.year = ` + year + ` 
                        AND r.score < (
                            SELECT AVG(r2.score)
                            FROM reviews r2, years y2
                            WHERE r2.reviewid = y2.reviewid AND y2.year = ` + yearminus + `
                            GROUP BY y2.year
                        )
                        ORDER BY r.score DESC
                        LIMIT 10`;
        console.log(query);

        db.query(query, (err, output) => {
            if (err) res.redirect('/'); 

            res.render('four_six_table.ejs', { // Pass data to front end
                title: "Four to Six Table Query", 
                results: output,
            });
        });
    },
}