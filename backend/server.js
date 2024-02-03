const express = require('express');
const app =express();

app.get('/',(req,res)=>{
    res.send('hello');
});

app.get('/about',(req,res)=>{
    res.send('About');
});

app.get('/login',(req,res)=>{
    res.send('Login');
});

app.get('/contact',(req,res)=>{
    res.send('Contact');
});
app.listen(3000, ()=>{
    console.log("done");
})
