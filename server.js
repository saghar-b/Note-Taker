const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const noteRoutes = require("./routes/noteRoutes")
app.use("/api/notes",noteRoutes)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))

})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);