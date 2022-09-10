const express = require('express');
const {notes} = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

function createNewNote (body,notesArray) {

    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes:notesArray},null,2)
    );
    return note;

};


app.get('/api/notes', (req,res) => {
    let results = notes;
    res.json(results);
    //res.send('hello');
    console.log(results);
} );

app.post('/api/notes', (req,res) => {

    req.body.id = notes.length.toString();

    const note = createNewNote(req.body,notes);
    
} );



app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
} );

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
} );



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);

});