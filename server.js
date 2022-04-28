const express = require('express');
const mysql= require('mysql2')
const path = require('path');
const fs = require('fs');
const util = require('util');
const uuid = require('./helpers/uuid');
const { json } = require('body-parser');
const PORT = process.env.PORT || 3000;
require("dotenv").config();
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Connect to database
const db = mysql.createConnection(
  {
    // host: 'localhost',
    host : process.env.HOST || 'localhost',
    // MySQL username,
    user:  process.env.USER ||'root',
    // MySQL password
    password: process.env.PASSWORD || 'sanaz123',
    database:  process.env.DATABASE || 'note_db'
  },
  console.log(`Connected to the courses_db database.`)
);


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
    db.query('SELECT * FROM note_db', function (err, results) {
        console.log(results);
        res.send(results);
      });
      
});
db.query('CREATE REMOTE TABLE note_db.schema.note_db ')
app.post('/api/notes', (req, res) => {
    // let ranId= uuid;
    db.query(`INSERT INTO note_db (id, title, text)
    VALUES ('${uuid()}', '${req.body.title}', '${req.body.text}');`)

    const { title, text } = req.body;
    const note = {
        title,
        text,
        id: uuid()
    }
    db.query('SELECT * FROM note_db', function (err, results) {
        console.log(results);
        res.send(results);
      });
    // console.log(note)
})
app.delete('/api/notes/:id',(req,res)=>{
    console.log("delete")
    console.log(req.params.id)
    
    db.query(`DELETE FROM note_db WHERE id = ?`, req.params.id, (err, result) => {
        if (err) {
          console.log(err);
        }
        // console.log(result);
      });
      db.query('SELECT * FROM note_db', function (err, results) {
        console.log(results);
        res.send(results);
      });
})
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);