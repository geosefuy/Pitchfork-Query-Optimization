module.exports = {
    loadPageThree: (req, res) => {
        res.render('three_table.ejs', { // Pass data to front end
            title: "Three Table Query",
            results: false
        });
    },
    threeQuery1: (req, res) => {
        //query here
        let query = "";

        db.query(query, (err, output) => {
            if (err) res.redirect('/'); 

            res.render('three_table.ejs', { // Pass data to front end
                title: "Three Table Query 1", 
                results: output
            });
        });
    },
    threeQuery2: (req, res) => {
        //query here
        let query = "";

        db.query(query, (err, output) => {
            if (err) res.redirect('/'); 

            res.render('three_table.ejs', { // Pass data to front end
                title: "Three Table Query 2", 
                results: output
            });
        });
    },
}