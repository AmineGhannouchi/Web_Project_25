//we shoul use express.static on the end of the project (need static frontend(buid version)) utilite : séparant les ressources statiques du code backend

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger,logEvents} = require('./middleware/log');
const errorHandler = require('./middleware/errorHandler');
const port = process.env.PORT || 3500;
//"npm run build" pour cree le dossier 'dist'

//"npm run dev" pour le mode devlpement // a chaque modification du code node restart

//custom middleware logger and errorHandler
app.use(logger);
app.use(errorHandler);

//cross origin resource sharing
const corsOptions = require('./config/corsConfig');
app.use(cors(corsOptions)); //for api from externel websites

//the routes
const router = require('./routes/mainRoute');
app.use('/',router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

