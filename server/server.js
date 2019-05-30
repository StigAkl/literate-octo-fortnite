const express = require('express');
const favicon = require('express-favicon'); 
const path = require('path'); 
const port = process.env.PORT || 3001; 
const app = express(); 
const itemRouter = require("./routers/item-router");
require('./db/mongoose'); 
app.use(favicon(__dirname + '/../build/favicon.ico')); 
app.use(express.json())
app.use(express.static(__dirname)); 
app.use(express.static(path.join(__dirname, '/../build')));
app.use(itemRouter); 

app.get('/ping', (req, res) => {
    res.send('pong'); 
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/../build', 'index.html')); 
}); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../build', 'index.html'))
})


app.listen(port); 

