$(".scrape").on("click", function (req, res){
    $.get("/api/scrape")

    .then(function (data){
        console.log(data);
    })
    .catch(function (err){
        console.log(err);
    })
});

