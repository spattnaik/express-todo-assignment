const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/route');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);
mongoose.Promise = Promise;
const mongooseOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, //recommended, but makes initial connection slower
}

mongoose.connect(process.env.DB_CONNECT, mongooseOptions, () => {
    console.log("Connected to db!");
    app.listen(process.env.PORT, () => {
        console.log("Server Up and running")
    });
});
