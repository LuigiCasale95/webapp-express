/* importiamo il pacchetto mysql2 */
const mysql = require('mysql2');

/* usiamo il metodo di creazione oggetto di connessione */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Luigicasale95',
    database: 'movies_db'
});

/* tramite metodo connect avvia connessione */
connection.connect((err) => {
    if (err) throw err;
    console.log('connected to MySQL!');
});

/* esportiamo il modulo CJS */
module.exports = connection;