var db = require("../models");

module.exports = {
    scrape: function (req, res) {
        axios.get("https://www.vice.com/en_us").then(function (response) {
            var $ = cheerio.load(response.data);



            $(".heading-hover").each(function (i, element) {
                var results = {};
                results.title = $(element).text();

                results.link = `www.vice.com${$(element).attr("href")}`;

                db.Article.create(results)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });

        })
    }
}