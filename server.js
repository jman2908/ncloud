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
    })
})