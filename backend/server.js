//we shoul use express.static on the end of the project (need static frontend) utilite : séparant les ressources statiques du code backend

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger,logEvents} = require('./middleware/log');
const errorHandler = require('./middleware/errorHandler');
const port = process.env.PORT || 3500;
const frontend = path.join(__dirname,'..','frontend','dist');
//"npm run build" pour cree le dossier 'dist'

//"npm run dev" pour le mode devlpement // a chaque modification du code node restart

//custom middleware logger
app.use(logger);

//cross origin resource sharing
const whiltelist = ['sql url','frontend url'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whiltelist.indexOf(origin) !== -1 || !origin){// remove !origin from the list
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions)); //for api from externel websites

app.use(errorHandler);

//^ ← must start with the simbol next to the ^ 
//$ ← must end with the simbol befor the $
//()? ← between the () is optional

app.get('^/$|/index(.html)?', (req, res) => {

    res.sendFile(path.join(frontend ,'index.html'));
});

app.get('/new_file', (req, res) => {
    res.sendFile(path.join(frontend ,'index.html'));
    res.redirect(301,'/old_file');//faire une redirection // 302 by default
});

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(frontend ,'404.html'));//custom 404 file
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

