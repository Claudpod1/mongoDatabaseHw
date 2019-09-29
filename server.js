const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// require('dotenv').config()

const PORT = process.env.PORT || 4000;
const app = express();


// config 
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs ({defaultLayout: "main"}));
app.set("view engine", "handlebars");


const routes = require("./controllers");

app.use(routes);

// connect to mongoose 
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

const db = mongoose.connection

db.on('error', err =>
  console.log('Mongoose connection error: ${err}'))
db.once('open', () => 
  console.log('Connected to MongoDB'))




// start the server 
app.listen(PORT, function() {
    console.log("App is running on port " + PORT + "!");
  });
  