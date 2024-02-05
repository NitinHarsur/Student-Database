const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();


dotenv.config({path:'./config.env'})
require('./db/conn')
const PORT = process.env.PORT;


app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/about', (req, res) => {
    res.send('About');
});

app.get('/login', (req, res) => {
    res.send('Login');
});

app.get('/contact', (req, res) => {
    res.send('Contact');
});

app.listen(PORT, () => {
    console.log(`Server Is Running ON ${PORT}` );
});
