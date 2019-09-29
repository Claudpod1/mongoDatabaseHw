const db = require("../models");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

// route for a homepage 

router.get("/", (req, res) => {
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
 
// route for scraping vice.com

router.get("/scrape", (req, res) => {
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

            db.Article.create(results)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

    });
});


    router.get("/articles/:id",(req, res) => {
        db.Article.findOne({_id: req.params.id})
        // .populate("note")
        .then(function(dbArticle) {
            console.log(dbArticle[0])
          let note = dbArticle.note
          let article = dbArticle
          let articleObject = {logo: article.title, title: note.title, body: note.body, id: note._id}
          res.render('note', articleObject)
        })
        .catch(function (err) {
        console.log(res.json(err))

      });
    });


    //route to save an article 
    router.get('/saved/:id',  (req, res) => {
        db.Article.findByIdAndUpdate(req.params.id, {$set: {saved: true}}, {new: true})
        .then( () => res.redirect('/'))
        .catch(err => res.json(err));
      });

    


    //route to grab all saved articles
  router.get('/saved',(req, res) =>{
    db.Article.find({saved: true})
    .then(result => {
      let articleObject = {article: result}
      res.render('saved', articleObject);
    })
    .catch(err => res.json(err))
  });

//delete
router.get('/note/delete/:id', (req, res) => {
    db.Note.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/'))
    .catch(err => res.json(err))
  });

//   //route to delete article
  router.get('/article/delete/:id', (req, res) => {
    db.Article.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/'))
    .catch(err => res.json(err))
  });

module.exports = router;