const express = require('express');
const router = express.Router();
const dss = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
router.get("/", (req, res) => {
  dss.readFromFile("./db/db.json").then(
    (data) => {
      res.send(JSON.parse(data))
    }
  );


});
router.post('/', (req, res) => {

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
router.delete('/:id', (req, res) => {
  dss.readFromFile("./db/db.json").then(
    (data) => {
      const allNotes = JSON.parse(data);
      const result = allNotes.filter(deleteId => {
        return deleteId.id != req.params.id;
      })
      dss.writeToFile("./db/db.json", result)

    }
  );
  dss.readFromFile("./db/db.json").then(
    (data) => {
      res.send(JSON.parse(data))
    }
  );
})

module.exports = router;