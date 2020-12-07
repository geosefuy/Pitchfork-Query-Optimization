module.exports = {
    home: (req, res) => {
        //query here
        let query = "";

        db.query(query, (err, output) => {
            if (err) res.redirect('/'); 

            res.render('index.ejs', { // Pass data to front end
                title: "Homepage", 
                students: output
            });
        });
    }
}