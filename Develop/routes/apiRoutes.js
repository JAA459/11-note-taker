var fs = require("fs");
var notes = require("../db/db.json");
var path = require("path");
// var filepath = "../db/db.json"
// var notes = fs.readFile(filepath, 'utf8', (error, data) =>
// error ? console.error(error) : console.log(data)
// );

module.exports = function (app) {
//     // API GET Requests
//     // Below code handles when users "visit" a page.
//     // In each of the below cases when a user visits a link
//     // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
//     // ---------------------------------------------------------------------------
    app.get("/api/notes", function (req, res) {
        res.json(notes);
    });
  
//     // API POST Requests
//     // Below code handles when a user submits a form and thus submits data to the server.
//     // In each of the below cases, when a user submits form data (a JSON object)
//     // ...the JSON is pushed to the appropriate JavaScript array
//     // (ex. User fills out a reservation request... this data is then sent to the server...
//     // Then the server saves the data to the tableData array)
//     // ---------------------------------------------------------------------------
app.post("/api/notes", function (req, res) {
    const file = path.join(__dirname,"../db/db.json");
    const newNote = req.body;

    notes.push(newNote);

    fs.appendFile(file,JSON.stringify(newNote, null, 4) ,err => {
        if (err) throw err;
        console.log("note saved!");
    });
    res.send(newNote);
});
//     // app.post("/api/notes", function (req, res) {
//     //   // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
//     //   // It will do this by sending out the value "true" have a table
//     //   // req.body is available since we're using the body parsing middleware
//     //   if (tableData.length < 5) {
//     //     tableData.push(req.body);
//     //     res.json(true);
//     //   }
//     //   else {
//     //     waitListData.push(req.body);
//     //     res.json(false);
//     //   }
//     // });
  
//     // ---------------------------------------------------------------------------
//     // I added this below code so you could clear out the table while working with the functionality.
//     // Don"t worry about it!
  
//     // app.post("/api/clear", function (req, res) {
//     //   // Empty out the arrays of data
//     //   tableData.length = 0;
//     //   waitListData.length = 0;
  
//     //   res.json({ ok: true });
//     // });
  };
  