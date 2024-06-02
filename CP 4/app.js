"use strict";

const CLIENT_ERR_CODE = 400;

// Using the express library
const express = require("express");
const app = express();

// Required middleware for express
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.static("public"));

// Given an undergraduate house, returns information about that house in text format.
// If an invalid house is specified, a 400 error is returned.
app.get("/houses/:name", async (req, res, next) => {
    res.type("text");
    let msg = "";
    if (req.params.name === "lloyd") {
        msg = "Lloyd house is one of the eight undergraduate houses at Caltech. " +
              "It was built in honor of Ralph and Lulu Lloyd in 1960. Today, the house is " +
              "a cornerstone of undergraduate life. Full and social members of the house " +
              "participate in camping, skiing, and beach trips! Smaller events occur on a " +
              "weekly basis, while unofficial events happen nearly every day.";
    } else if (req.params.name === "venerable") {
        msg = "Venerable is one of the eight undergraduate houses at Caltech. " +
              "It is the scariest house on campus, nothing more can be said.";
    } else {
        res.status(CLIENT_ERR_CODE);
        next(Error("Error: Undergraduate house must be lloyd or venerable"));
    }
    res.send(msg)
});

// Returns information about Bechtel residence in json format.
app.get("/bechtel", function (req, res) {
    res.type("json");
    let msg = "Bechtel is the only undergraduate residence on Caltech's campus. " +
              "It was built for students who are not affiliated with a house " +
              "However, since the facilities are nicer in Bechtel than in Lloyd " +
              "or Venerable, people are unaffiliating to live in a nicer room. This " +
              "is the cause of the recent housing crisis.";
    res.json({"text":msg});
});

/**
 * Handles and processes errors thrown in app.get 
 * @param {Error} err Error object
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Next middleware function
 * @returns None
 */
function errorHandler(err, req, res, next) {
    // All error responses are plain/text in the Cafe API.
    res.type("text");
    res.send(err.message);
}

app.use(errorHandler);

// Operates on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
});