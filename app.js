/* Import di express */
const express = require("express");
/* creazione di un instanza per express */
const app = express();
/* Impostazione di un ref per il numero della porta */
const port = 3000;

/* Importo globalmente il middleware di gestione errore server */
const errorServer = require("./middlewares/errorServer");
/* Importo globalmente il middleware di gestione 404 PER ROTTA INNESISTENTE */
const notFound = require("./middlewares/notFound");

/* usiamo il middleware di espress per rendere disponibili i file statici */
app.use(express.static('public'));

// registro di body-parser per "application/JSON"
app.use(express.json());

// rotte per i film
// app.use("/movies", movieRouter)

//impostazione rotta di HOME
 app.get("/api", (req, res) => {
    console.log("hao richiesto la rotta di index");
    res.send("<h1>Ecco la homedella api dei film </h1>")
 });

 // richiamo middleware per gestrione errori server
app.use(errorServer);

 // richiamo miidleware per gestione 404 rotta innsistente 
app.use(notFound);

 // Mettiamo in ascolto il server  sulla porta definita
app.listen(port, () => {
    console.log(`EXAMPLE APP LISTENING ON PORT ${port}`);
    
 });