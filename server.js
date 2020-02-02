const express = require ("express");
const logger = require ("morgan");
const mongoose = require ("mongoose");

const axios = require ("axios");
const cheerio = require ("cheerio");

const db = require ("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongo://localhost/mongoHeadLines";

mongoose.connect(MONGODB_URI);

//Routes

app.get("/scrape", function(req, res) {
    axios.get("http://www.nytimes.com").then(function(response) {
        const $ = cheerio.load(response.data);

        $("h5").each(function(i, element) {
            const result = {};

            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href");

        db.Article.create(result)
        .then(function(dbArticle) {
            console.log(dbArticle);
        })
        .catch(function(err) {
            console.log(err);
        });

        });

        res.send("Scrape Complete");
    });
});

app.get("/articles", function(req, res) {
    db.Article.find()
    .then(function(dbPopulate) {
        res.json(dbPopulate);
    })
    .catch(function(err) {
        res.json(err);
    });
});

