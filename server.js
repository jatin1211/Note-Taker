const express = require("express");
const { notes } = require("./db/db.json");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static("public"));

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
  //return res.json(note);
}

app.get("/api/notes", (req, res) => {
  let results = notes;
  res.json(results);
 
});

app.post("/api/notes", (req, res) => {
  req.body.id = (notes.length + 1).toString();

  const note = createNewNote(req.body, notes)
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  for (var i = 0; i < notes.length; i++) {
    if (noteId == notes[i].id) {
      notes.splice(i, 1);
    }
  }
  fs.writeFileSync("./db/db.json", JSON.stringify({notes}));

      res.json(notes);
   
  //   console.log(notes);
  //   res.json(notes);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
