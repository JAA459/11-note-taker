var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;
var path = require("path");
const bodyParser = require('body-parser');


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("../public"));


require("../routes/apiRoutes")(app);
require("../routes/htmlRoutes")(app);


app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});