"use strict";

const CLIENT_ERR_CODE = 400;
const SERVER_ERR_CODE = 500;

const SERVER_ERROR = "server error";
const CLIENT_ERROR = "invalid input";

// Using the express library
const express = require("express");
const multer = require("multer");
const fs = require("fs/promises");

const app = express();

// Required middleware for express
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.static("public"));

// For application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// For application/json
app.use(express.json());
// for multipart/form-data (required with FormData)
app.use(multer().none());

// Adds information from the contact form to messages.json
app.post("/addMessage", async (req, res, next) => {
    res.type("text");

    let info = [];
    try {
        info = extractInfo(req.body);
    } catch (err) {
        res.status(CLIENT_ERR_CODE);
        err.message = CLIENT_ERROR;
    }
    let result = {"first" : info[0], "last" : info[1], "phone": info[2], "email": info[3], "message": info[4]};
    let jsonFile = "messages.json";
    let contents = [];
    try {
        contents = await fs.readFile(jsonFile, "utf8");
    } catch (err) {
        if (err.code !== "ENOENT") {
            res.status(SERVER_ERR_CODE);
            err.message = SERVER_ERROR;
            next(err);
        }
    }
    contents = JSON.parse(contents);
    contents.push(result);
    try {
        await fs.writeFile(jsonFile, JSON.stringify(contents), "utf8");
        res.send(`Request to add ${info[0]}'s message to file successfully received!`);
    } catch (err) {
        res.status(SERVER_ERR_CODE);
        err.message = SERVER_ERROR;
        next(err);
    }
});

/**
 * @param {JSON} body - Json containing information from the contact form
 * @return {list} - List of strings containing information from the contact form 
 */
 function extractInfo(body) {
    return [body.first, body.last, body.phone, body.email, body.message];
}

// Adds all items in the current cart to cart.json
app.post("/checkout", async (req, res, next) => {
    res.type("text");
    let realNames = [];
    try {
        let plantNames = req.body.plantNames;

        for (const name in plantNames) {
            if (plantNames[name] != "null") {
                realNames.push(plantNames[name]);
            }
        }
    } catch(err) {
        res.status(CLIENT_ERR_CODE);
        err.message = CLIENT_ERROR;
        next(err);
    }

    let result = {"basket" : realNames};
    let jsonFile = "cart.json";
    let contents = [];

    try {
        contents = await fs.readFile(jsonFile, "utf8");
    } catch (err) {
        if (err.code !== "ENOENT") {
            res.status(SERVER_ERR_CODE);
            err.message = SERVER_ERROR;
            next(err);
        }
    }
    contents = JSON.parse(contents);
    contents.push(result);
    try {
        await fs.writeFile(jsonFile, JSON.stringify(contents), "utf8");
        res.send(`Successfully sent to the manufacturer!`);
    } catch (err) {
        res.status(SERVER_ERR_CODE);
        err.message = SERVER_ERROR;
        next(err);
    }
});

// Returns the question corresponding to the given index
app.get("/question/:number", async (req, res, next) => {
    res.type("json");
    const number = parseInt(req.params.number);
    const questions = [
        "What is the best soil for indoor plants?",
        "How often should I water my plants?",
        "What are the best low-light plants?",
        "How do I prevent pests on my plants?",
        "What is the best way to fertilize my plants?"
    ];
    if (number >= 1 && number <= 5) {
        res.json({ text: questions[number - 1] });
    } else {
        res.status(CLIENT_ERR_CODE);
        next(new Error("Invalid question number"));
    }
});

// Returns the answer corresponding to the given index
app.get("/answer/:number", async (req, res, next) => {
    res.type("json");
    const number = parseInt(req.params.number);
    const answers = [
        "The best soil for indoor plants is a well-draining potting mix. Avoid garden soil as it may not drain well.",
        "Most indoor plants should be watered every 1-2 weeks, depending on the type of plant and the environment.",
        "Some of the best low-light plants include snake plants, ZZ plants, and pothos.",
        "To prevent pests on your plants, keep them healthy by providing proper care and regularly inspect them for signs of pests.",
        "The best way to fertilize your plants is to use a balanced, water-soluble fertilizer every 4-6 weeks during the growing season."
    ];
    if (number >= 1 && number <= 5) {
        res.json({ text: answers[number - 1] });
    } else {
        res.status(CLIENT_ERR_CODE);
        next(new Error("Invalid answer number"));
    }
});

// Returns the promotion corresponding to the given index
app.get("/promotion/:number", async (req, res, next) => {
    res.type("json");
    const number = parseInt(req.params.number);
    const promotions = [
        "20% off on all indoor plants!",
        "Buy one get one free on cacti",
        "Free shipping on orders over $50!",
        "Free pot with any plant purchase",
        "With any daisy purchase, receive 25% off on next purchase"
    ];
    if (number >= 1 && number <= 5) {
        res.json({text:promotions[number-1]})
    } else {
        res.status(CLIENT_ERR_CODE);
        next(new Error("Invalid promotion number"));
    }
});

// Returns all plant information
app.get("/plant-info", async (req, res, next) => {
    res.type("json");
    let data = await fs.readFile("plant-info.json", "utf8");
    let contents = JSON.parse(data);
    res.send(contents);
});

// Returns specific plant information
app.get("/plant-info/:name", async (req, res, next) => {
    res.type("json");
    const name = req.params.name;
    let data = await fs.readFile("plant-info.json", "utf8");
    let contents = JSON.parse(data);
    let result = contents[name];
    if(result) {
        res.send(result);
    } else {
        res.status(CLIENT_ERR_CODE);
        next(new Error("Invalid plant name"));
    }
});

// Returns all plants that can survive in a given season
app.get("/plant-filter/:season", async (req, res, next) => {
    res.type("json");
    const season = req.params.season;
    if(season === "summer" || season === "winter" || season === "all") {
        let data = await fs.readFile("plant-info.json", "utf8");
        let contents = JSON.parse(data);
        let result = [];
        for(const item in contents) {
            if (contents[item][2] === season || season === "all") {
                result.push(item);
            }
        }
        res.send({"items" : result});
    } else {
        res.status(CLIENT_ERR_CODE);
        next(new Error("invalid filter, must be 'summer' or 'winter'"));
    }
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
    res.type("text");
    res.send(err.message);
}

app.use(errorHandler);

// Operates on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
});