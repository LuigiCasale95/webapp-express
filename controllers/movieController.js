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
        // ritorniamo il risultato ottenuto
        res.json(result);
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
        const singlemovie = movieResult[0];
        singlemovie.image = req.imagePath + singlemovie.image;


        // aggiungiamo connesione per richiesta reviews relative
        connection.query(reviewSql, [id], (err, reviewResult) => {
            // gestiamo errore server mysql
            if (err) return res.status(500).json({ error: "Database error" })
            // aggiungiamo le reviews sull'oggetto del singolo film
            singlemovie.reviews = reviewResult;


            // ritorniamo il risultato ottenuto
            res.json(singlemovie);
        });


    });

}

module.exports = { index, show }