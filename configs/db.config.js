const mongoose = require('mongoose');
const DB_NAME = 'spot-it';
const DB_URI = `mongodb://localhost:27017/${DB_NAME}`;

mongoose.connect(DB_URI)
    .then(()=> 
        console.info(`Connected to ${DB_NAME} database`)
    )
    .catch(error => console.error(error));