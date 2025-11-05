// Importiamo il file di connessione al database
const connection = require('../data/db');

//  INDEX
function index(req, res) {

    // impostiamo la query
    const sql = 'SELECT * FROM movies';

    // aggiungiamo la connesione per la richiesta
    connection.query(sql, (err, result) => {
        // gestiamo errore server mysql
        if (err) return res.status(500).json({ error: "Database error" })

// prepariamo versione listato film con valore image completo
            const movies = result.map((movie) => {
                return {
                    ...movie,
                    image: req.imagePath + movie.image
                }
            });
        // ritorniamo il risultato ottenuto
        res.json(movies);
    });
}

//  SHOW
function show(req, res) {
    // recuperiamo id da param
    const id = req.params.id; 

    // prepariamo query per singolo film
    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    // prepariamo la query per reviews del fim
    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // aggiungiamo la connesione per la richiesta
    connection.query(movieSql, [id], (err, movieResult) => {
        // gestiamo errore server mysql
        if (err) return res.status(500).json({ error: "Database error" })


        // gestiamo anche il 404
        if (movieResult.length === 0) return res.status(404).json({ error: "Movie not found" })

        // creiamo oggetto singolo film
        const singleMovie = movieResult[0];
        singleMovie.image = req.imagePath + singleMovie.image;


        // aggiungiamo connesione per richiesta reviews relative
        connection.query(reviewSql, [id], (err, reviewResult) => {
            // gestiamo errore server mysql
            if (err) return res.status(500).json({ error: "Database error" })
            // aggiungiamo le reviews sull'oggetto del singolo film
            singleMovie.reviews = reviewResult;


            // ritorniamo il risultato ottenuto
            res.json(singleMovie);
        });

    });

}

// Store review
function storeReview(req, res) {

    // recuperiamo id da param
    const id = req.params.id;

    // recuperiamo i dati nel body
    const { name, vote, text } = req.body;

    // prepariamo la query per la chiamata al DB
    const sql = 'INSERT INTO `reviews` (`name`, `vote`, `text`, `movie_id`) VALUES (?,?,?,?)';

    // eseguiamo la query (con check preventivo dei dati)
    connection.query(sql, [name, vote, text, id], (err, result) => {
        // se c'è errore server DB
        if (err) return res.status(500).json({ error: 'Database queri failed' });
        // se va tutto bene
        res.status(201);
        res.json({ id: result.insertId, message: 'Review added' });
    })

}

module.exports = { index, show , storeReview}