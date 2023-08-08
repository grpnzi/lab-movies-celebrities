// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");


// ****************************************************************************************
// GET route to display the form to "register" a celebrity
// ****************************************************************************************

router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity"));

// ****************************************************************************************
// POST route to submit the form to create a celebrity
// ****************************************************************************************

router.post("/celebrities/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    // Check if the celebrity with the given name already exists in the database
    Celebrity.findOne({ name })
    .then((celebrityDocFromDB) => {
        if (!celebrityDocFromDB) {
            // If the celebrity doesn't exist, create a new one
            Celebrity.create({ name, occupation, catchPhrase })
            .then(() => {
                res.redirect('/celebrities');
            })
        } else {
            res.render("celebrities/new-celebrity");
            return;
        }
    })
    .catch((err) => console.log(`Error while creating a new celebrities: ${err}`));
});

// ****************************************************************************************
// GET route to display all celbrities from the DB
// ****************************************************************************************

router.get("/celebrities", (req, res) => {
    Celebrity.find() // <-- .find() method gives us always an ARRAY back
      .then((CelebritiesFromDB) => res.render("celebrities/celebrities", { Celebrities: CelebritiesFromDB }))
      .catch((err) => console.log(`Error while getting Celebrities from the DB: ${err}`));
});

module.exports = router;