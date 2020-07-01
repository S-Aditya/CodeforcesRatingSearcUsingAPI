var express = require("express");

var app = express();

var request = require("request"); 

app.set("view engine","ejs");

app.get("/",function(req,res) {
    res.render("search");
})

app.get("/results", function (req,res) {
    
    var queryString = req.query.search;

    var url = "https://codeforces.com/api/user.rating?handle=";

    url += queryString;

    request(url,function(error,response,body) {
        if(!error && response.statusCode == 200)
        {
            //note that initially body is a string
            //we need to parse it to an object
            var data = JSON.parse(body);

            res.render("results", {data: data});
        }
    })
})

app.listen("3000",function () {
    console.log("Server started at port 3000");
})