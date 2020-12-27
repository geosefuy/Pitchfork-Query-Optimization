module.exports = {
    loadPageTwo: (req, res) => {
        res.render('two_table.ejs', { // Pass data to front end
            title: "Two Table Query",
            results: false
        });
    },
    twoQuery1: (req, res) => {
        //query here
        let query = "";

        db.query(query, (err, output) => {
            if (err) res.redirect('/'); 

            res.render('two_table.ejs', { // Pass data to front end
                title: "Two Table Query 1", 
                results: output
            });
        });
    },
    twoQuery2: (req, res) => {
        //query here
        let query = "";

        db.query(query, (err, output) => {
            if (err) res.redirect('/'); 

            res.render('two_table.ejs', { // Pass data to front end
                title: "Two Table Query 2", 
                results: output
            });
        });
    },
}