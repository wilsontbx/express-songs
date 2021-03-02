const express = require("express");
const router = express.Router();
const Joi = require("joi");

const movies = [];

function validateMovie(movie) {
  const schema = Joi.object({
    id: Joi.number().integer(),
    movieName: Joi.string().min(1).required(),
  });
  return schema.validate(movie);
}

router.param("movieID", (req, res, next, movieID) => {
  const movie = movies.find((movie) => movie.id === parseInt(movieID));
  req.movie = movie;
  next();
});

router.post("/", (req, res) => {
  const validation = validateMovie(req.body);
  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 400;
    next(error);
  }

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
router.use((err, req, res, next) => {
  res.statusCode = err.statusCode;
  res.send(`${err}`);
});
module.exports = router;
