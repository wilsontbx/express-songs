const express = require("express");
const app = express();
app.use(express.json());

const requireJsonContent = (req, res, next) => {
    if (req.headers["content-type"] !== "application/json") {
        res.status(400).send("Server wants application/json!");
    } else {
        next();
    }
};
app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

app.post("/", requireJsonContent, (req, res) => {
    res.status(201).send("Thanks for the JSON!");
});

const songRouter = require("./router/song.routes");
app.use("/songs", songRouter);

const movieRouter = require("./router/movie.routes");
app.use("/movies", movieRouter);
// app.use((req, res, next) => {
//     console.log("common middleware songs is called");
//     next();
// });

// app.get("/songs", (req, res, next) => {
//     console.log("middleware songs is called");
//     next();
// });

// app.post("/songs", (req, res, next) => {
//     console.log("middleware songs is called(post)");
//     next();
// });

module.exports = app;
