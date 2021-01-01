module.exports = {
    loadPageOne: (req, res) => {
        res.render('one_table.ejs', { // Pass data to front end
            title: "One Table Query",
            results: false
        });
    },
    oneQuery1: (req, res) => {
        //query here
        let query = "SELECT * FROM artists";

        db.query(query, (err, output) => {
            if (err) res.redirect('/'); 

            res.render('one_table.ejs', { // Pass data to front end
                title: "One Table Query 1", 
                results: output
            });
        });
    },
    oneQuery2: (req, res) => {
        //query here
        let query = "";

        db.query(query, (err, output) => {
            if (err) res.redirect('/'); 

            res.render('one_table.ejs', { // Pass data to front end
                title: "One Table Query 2", 
                results: output
            });
        });
    },
}