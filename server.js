//import modules
const path = require("path");
const express = require("express");
const expressHandlebars = require("express-handlebars")

//setup express
var app = express();
var PORT = process.env.PORT || 3000;

//config middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.engine("handlebars", expressHandlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//define routes
require("./controllers/burgerController")(app);

app.listen(PORT, function() {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});
