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

const songRouter = require("./src/router/song.routes");
app.use("/songs", songRouter);

const movieRouter = require("./src/router/movie.routes");
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

// app.get("/error", (req, res) => {
//   // synchronous error
//   const error = new Error("Not found.");
//   error.statusCode = 404;
//   throw error;
// });

// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   res.send(
//     `${err} </br>
//       <b>Error Status Code:</b> ${err.statusCode} <br>
//       <b>Error Stack:</b> ${err.stack}`
//   );
// });

// app.get("/", (req, res, next) => {
//   // assume some asynchronous error happens because of an network issue
//   const err = new Error("Unexpected network error");
//   next(err);
// });

// app.use((err, req, res, next) => {
//   if (err.message === "Unexpected network error") {
//     console.log("I don't know how to handle network error. Pass it on.");
//     next(err);
//   } else {
//     console.log("Unknown error. Pass it on.");
//     next(err);
//   }
// });

module.exports = app;
