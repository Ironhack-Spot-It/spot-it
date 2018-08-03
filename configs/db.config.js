const mongoose = require('mongoose');
const DB_NAME = 'spot-it';
const DB_URI = `mongodb://heroku_94z2d8n7:p470g8egiv8lou24u04d3jji1d@ds211592.mlab.com:11592/heroku_94z2d8n7`;


mongoose.connect(process.env.DB_URI)
    .then(()=> 
        console.info(`Connected to ${DB_NAME} database`)
    )
    .catch(error => console.error(error));