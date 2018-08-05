require('dotenv');
const mongoose = require('mongoose');
const DB_NAME = 'spot-it';
const DB_URI =  process.env.MONGO_URI;



mongoose.connect(DB_URI)
    .then(()=> 
        console.info(`Connected to ${DB_NAME} database`)
    )
    .catch(error => console.error(error));