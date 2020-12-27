module.exports = {
    loadPageFourSix: (req, res) => {
        res.render('four_six_table.ejs', { // Pass data to front end
            title: "Four to Six Table Query",
            results: false
        });
    },
    fourSixQuery: (req, res) => {
        //query here
        let query = "";

        db.query(query, (err, output) => {
            if (err) res.redirect('/'); 

            res.render('four_six_table.ejs', { // Pass data to front end
                title: "Four to Six Table Query", 
                results: output
            });
        });
    },
}