//we shoul use express.static on the end of the project (need static frontend(buid version)) utilite : séparant les ressources statiques du code backend

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger,logEvents} = require  ('./middleware/log');
const errorHandler = require('./middleware/errorHandler');
const {pool,initializeDatabase} = require('./database/connect');
require('dotenv').config();

const port = process.env.PORT || process.env.PORT_SERVEUR;
//"npm run build" pour cree le dossier 'dist' dans le frontend

//"npm run dev" pour le mode devlpement // a chaque modification du code node restart



//custom middleware logger and errorHandler
app.use(logger);
app.use(errorHandler);


//cross origin resource sharing
app.use(cors(require('./config/corsConfig'))); //for api from externel websites

//the routes
app.use('/',require('./routes/mainRoute'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    initializeDatabase();
});

