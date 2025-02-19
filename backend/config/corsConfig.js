//list des url qui peuve utiliser le backend (api(GET,POST ....))
const whiltelist = [
    'sql url',
    'frontend url',
    'http://localhost:3500'
    ];
const corsOptions = {
    origin: (origin, callback) => {
        if(whiltelist.indexOf(origin) !== -1 || !origin){// remove !origin from the list
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;