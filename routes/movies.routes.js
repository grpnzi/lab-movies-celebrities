// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// ****************************************************************************************
// GET route to display the form to "register" a movie
// ****************************************************************************************

router.get("/movies/create", (req, res) =>{
    Celebrity.find()
      .then((dbCelebrities) => {
        res.render("movies/new-movie", { dbCelebrities });
      })
      .catch((err) => console.log(`Err while displaying movie input page: ${err}`));
});

// ****************************************************************************************
// POST route to submit the form to create a movie
// ****************************************************************************************

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, celebrityId } = req.body;
   
    Movie.create({ title, genre, plot, cast: celebrityId })
      .then(() => res.redirect('/movies')) // if everything is fine, redirect to list of movies
      .catch(err => {
        console.log(`Err while creating the movie in the DB: ${err}`);
      });
});


// ****************************************************************************************
// GET route to display all movies from the DB
// ****************************************************************************************

router.get("/movies", (req, res) => {
    Movie.find() // <-- .find() method gives us always an ARRAY back
      .then((MoviesFromDB) => res.render("movies/movies", { Movies: MoviesFromDB }))
      .catch((err) => console.log(`Error while getting movies from the DB: ${err}`));
});

// ****************************************************************************************
// GET route for displaying the movie details page
// ****************************************************************************************
 
router.get('/movies/:movieId', (req, res) => {
    const { movieId } = req.params;

    Movie.findById(movieId)
      .populate('cast')
      .then(foundMovie =>{ 
        res.render('movies/movie-details', {foundMovie})})
      .catch(err => {
        console.log(`Err while getting a movie from the  DB: ${err}`);
      });
});

// ****************************************************************************************
// GET route for displaying the movie delete page
// ****************************************************************************************
 
router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params;

    Movie.findByIdAndDelete(id)
      .then((MoviesFromDB) => {
        res.redirect('movies/movies', { Movies: MoviesFromDB })
      })
      .catch(err => {
        console.log(`Err while getting a movie from the  DB: ${err}`);
      });
});

// ****************************************************************************************
// GET route for displaying the movie edit page
// ****************************************************************************************

router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params;

    Movie.findById(id)
      .populate('cast')
      .then((data) => {
        res.render('movies/edit-movie', {data})
      })
      .catch(err => {
        console.log(`Err while getting a movie from the  DB: ${err}`);
      });
});

router.post('/movies/:id/edit', (req, res) => {
    const { id } = req.params;
    const { title, genre, plot , cast } = req.body;
    const movieDetails = {
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    }

    Movie.findByIdAndUpdate(id, movieDetails)
    .then(() => res.redirect('/movies/'+ id))
    .catch(err => {
      console.log(`Err while creating the post in the DB: ${err}`);
    });

});

module.exports = router;