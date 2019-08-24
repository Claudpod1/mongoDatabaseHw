const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const PORT = 3000;
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// ROutes 


axios.get("https://www.vice.com/en_us").then(function (response) {
    var $ = cheerio.load(response.data);

    var results = [];

    $(".heading-hover").each(function (i, element) {
        var title = $(element).text();

        var link = `www.vice.com${$(element).attr("href")}`;

        results.push({
            title: title,
            link: link
        });
    });
    console.log(results);
})


app.listen(PORT, function() {
    console.log("App is running on port " + PORT + "!");
  });
  