var fs = require("fs");
var notes = require("../db/db.json");
var path = require("path");
const bodyParser = require('body-parser');
const crypto = require("crypto");

// function deleteNote(noteId) {
//     // TODO: Load all notes from the db into an arroy
//     fs.readFile("../db/db.json", "utf8", (err, data) => {
//     var newArray = JSON.parse(data);
//     })
//     this.noteId = noteId;

//     for (let i = 0; i < newArray.length; i++) {
//         const element = newArray[i].id;
//         if (noteId === element) {
//             newArray.splice(i);
//         }else
//          return;

//     }
//     fs.writeFile(file, JSON.stringify(newArray, null, 4), err => {
//               if (err) throw err;
//               console.log("Your note was deleted.");
//             })

//     // TODO: Remove the note from the array (using the noteId parameter)
//     // TODO: Save the notes array back to the db file.
//   }


function generateUniqueID() {
  return crypto.randomBytes(8).toString('hex')
}

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    const file = path.join(__dirname, "../db/db.json");
    const newNote = req.body;

    newNote.id = generateUniqueID();

    notes.push(newNote);

    fs.writeFile(file, JSON.stringify(notes, null, 4), err => {
      if (err) throw err;
      console.log("note saved!");
    });
    res.send(newNote);
  });
  app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    const file = path.join(__dirname, "../db/db.json");
    // deleteNote(noteId);
    for (const note of notes) {
      if (id === note.id) {
        //   console.log(id);
        //   console.log(note.id);
        const index = notes.indexOf(note);
        notes.splice(index, 1);
        fs.writeFile(file, JSON.stringify(notes, null, 4), err => {
          if (err) throw err;
          console.log("Your note was deleted.");
        })
        res.end();
      }
    }
  });

};
