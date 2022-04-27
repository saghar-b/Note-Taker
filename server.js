const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const uuid = require('./helpers/uuid');
const { json } = require('body-parser');
// const port = process.env.PORT || 3000;
const PORT = 3000;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

let notes = [];

// GET Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))

});

app.get('/notes', (req, res) => {
    // Log that a POST request was received
    console.log('hiasdfadsfds');
    console.info(`${req.method} here hhh`);
    res.sendFile(path.join(__dirname, '/public/notes.html'))

})
app.get('/api/notes', (req, res) => {
    res.send([{
        id: 1,
        title: 'jeff',
        text: 'bla bla bla',
    },
    {
        id: 2,
        title: 'jeff 2',
        text: 'bla bla bla',
    },
    ]);
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const note = {
        title,
        text,
        id: uuid()
    }
    console.log(note)
})
app.delete('/api/notes/:id',(req,res)=>{
    console.log("delete")
    console.log(req.params.id)
})
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);