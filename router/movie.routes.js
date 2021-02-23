const express = require("express");
const router = express.Router();

const movies = [];

router.param("movieID", (req, res, next, movieID) => {
  const movie = movies.find((movie) => movie.id === parseInt(movieID));
  req.movie = movie;
  next();
});

router.post("/", (req, res) => {
  movies.push({
    id: movies.length + 1,
    movieName: req.body.movieName,
  });
  res.status(201).json(movies[movies.length - 1]);
});

router.get("/", (req, res) => {
  res.status(200).json(movies);
});

router.put("/:movieID", (req, res) => {
  const idFind = movies.findIndex(
    (element) => element.id === parseInt(req.movie.id)
  );

  movies[idFind].movieName = req.body.movieName;

  res.status(200).json(movies[idFind]);
});

router.delete("/:movieID", (req, res) => {
  const idFind = movies.findIndex(
    (element) => element.id === parseInt(req.movie.id)
  );

  const moviesDeleted = movies.splice(idFind, idFind < 0 ? 0 : 1);

  res.status(200).json(moviesDeleted[0]);
});

module.exports = router;
