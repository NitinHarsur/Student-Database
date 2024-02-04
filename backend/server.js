const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

const DB = 'mongodb+srv://nitinharsur:mongo%40123@cluster0.zjmwqdw.mongodb.net/studentdb?retryWrites=true&w=majority';

mongoose.connect(DB).then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.error("Connection failed:");
});

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

app.listen(3000, () => {
    console.log("done");
});
