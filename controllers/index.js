const db = require("../models");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

// route for a homepage 

router.get("/", function (req, res) {
    res.render("index")
})

// route for scraping vice.com

router.get("/scrape", function (req, res) {
    axios.get("https://www.vice.com/en_us").then(function (response) {
        var $ = cheerio.load(response.data);

        $(".heading-hover").each(function (i, element) {
            var results = {};
            results.title = $(element).text();

            results.link = `www.vice.com'{$(element).attr("href")}`;

            db.Article.create(results)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });


            // create a new article 

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        router.get("/articles", function (req, res) {
            db.Article.find({})
                .populate('note')
                .then(function (dbArticle) {
                    let articleObject = { articles: dbArticle }
                    res.render("index", articleObject)
                })
                .catch(function (err) {
                    console.log(res.json(err))
                });

            });
        });
    })

    module.exports = router; 
