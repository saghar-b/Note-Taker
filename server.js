const express = require('express');
const path = require('path');
const dss = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');



const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
  console.info(`${req.method} here hhh`);
  res.sendFile(path.join(__dirname, '/public/notes.html'))

})
app.get('/api/notes', (req, res) => {
  dss.readFromFile("./db/db.json").then(
    (data) => {
      res.send(JSON.parse(data))
    }
  );


});
app.post('/api/notes', (req, res) => {

  dss.readFromFile("./db/db.json").then(
    (data) => {
      const allNotes = JSON.parse(data);
      const { title, text } = req.body;
      const note = {
        title,
        text,
        id: uuid()
      }
      allNotes.push(note);
      dss.writeToFile("./db/db.json", allNotes)

    }
  );
  dss.readFromFile("./db/db.json").then(
    (data) => {
      res.send(JSON.parse(data))
    }
  );
})
app.delete('/api/notes/:id', (req, res) => {
  dss.readFromFile("./db/db.json").then(
    (data) => {
      const allNotes = JSON.parse(data);
      const result = allNotes.filter(deleteId => {
        return deleteId.id != req.params.id;
      })

      console.log("result");
      console.log(result);
      dss.writeToFile("./db/db.json", result)

    }
  );
  dss.readFromFile("./db/db.json").then(
    (data) => {
      res.send(JSON.parse(data))
    }
  );
})
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);