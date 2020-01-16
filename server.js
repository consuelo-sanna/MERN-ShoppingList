const express = require('express');  //backend framework
const mongoose = require('mongoose');  //interagisce con il DB mongo
//const bodyParser = require('body-parser'); //permette di ricevere richieste e restituire i valori.. ad esempio da post
const path = require('path');

const items = require('./routes/api/items');    

const app = express();   // inizializzo express dentro la var app

//Bodyparser middleware (non serve piu, infatti ora non carico piu neacneh il package)
app.use(express.json());

// DB Config
// permette di creare un oggetto db con tutte le informazioni per connettermi al db
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

// Use Routes
/*  ogni richiesta di pagina /api/items viene "dirottata" sul file ./routes/api/items
*/ 
app.use('/api/items', items);

// Serve static assets if we are in production
/** se sei in produzione, quando non matcha api/items carica la pag index.html */
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//process.env è una var che esiste quando deploy su heroku (e simili?)
const port = process.env.PORT || 4000;

app.listen(port, ()=> console.log("server started on port " + port));