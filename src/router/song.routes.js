const express = require("express");
const router = express.Router();
const songController = require("../../controllers/songControllers");
const Joi = require("joi");
const protectRoute = require("../middleware/protectorRoute");

function validateSong(song) {
  const schema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().min(3).required(),
    artist: Joi.string().min(3).required(),
  });
  return schema.validate(song);
}

router.param("id", (req, res, next, id) => {
  songController.findById(id).then((result) => {
    if (result?._message || !result) {
      const error = new Error(result?._message || result);
      error.statusCode = 400;
      next(error);
    } else {
      req.song = result;
      next();
    }
  });
});

router.get("/", (req, res) => {
  songController.getAllSongs().then((result) => {
    if (result._message) {
      const error = new Error(result._message);
      error.statusCode = 400;
      next(error);
    } else {
      res.statusCode = 200;
      res.json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  res.statusCode = 200;
  res.json(req.song);
});

router.post("/", (req, res, next) => {
  songController.createOne(req.body).then((result) => {
    if (result._message) {
      const error = new Error(result._message);
      error.statusCode = 400;
      next(error);
    } else {
      res.statusCode = 201;
      res.json(result);
    }
  });
});

router.put("/:id", protectRoute, (req, res, next) => {
  songController.updateById(req.song.id, req.body).then((result) => {
    if (result._message) {
      const error = new Error(result._message);
      error.statusCode = 400;
      next(error);
    } else {
      res.statusCode = 201;
      res.json(result);
    }
  });
});

router.delete("/:id", protectRoute, (req, res) => {
  songController.deleteById(req.song.id).then((result) => {
    if (result._message) {
      const error = new Error(result._message);
      error.statusCode = 400;
      next(error);
    } else {
      res.statusCode = 200;
      res.json(result);
    }
  });
});

router.use((err, req, res, next) => {
  res.statusCode = err.statusCode;
  res.send(`${err}`);
});

router.use((err, req, res, next) => {
  res.statusCode = err.statusCode;
  res.send(`${err}`);
});

module.exports = router;
