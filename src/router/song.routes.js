const express = require("express");
const router = express.Router();
const songController = require("../../controllers/songControllers");
const Joi = require("joi");

// const songs = [
//   {
//     id: 1,
//     name: "someSongName",
//     artist: "someSongArtist",
//   },
//   {
//     id: 2,
//     name: "anotherSongName",
//     artist: "anotherArtist",
//   },
// ];

function validateSong(song) {
  const schema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().min(3).required(),
    artist: Joi.string().min(3).required(),
  });
  return schema.validate(song);
}

router.param("id", (req, res, next, id) => {
  // let song = songs.find((song) => song.id === parseInt(id));
  // req.song = song;
  // next();
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
  // res.status(200).json(songs);
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
  // const id = req.params.id;
  // const songsFilter = songs.filter((element) => element.id == id);
  // res.statusCode = 200;
  // res.json(songsFilter);
  res.statusCode = 200;
  res.json(req.song);
});

router.post("/", (req, res, next) => {
  // const validation = validateSong(req.body);
  // if (validation.error) {
  //   const error = new Error(validation.error.details[0].message);
  //   error.statusCode = 400;
  //   next(error);
  // } else {
  // }

  songController.createOne(req.body).then((result) => {
    console.log(result);
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

router.put("/:id", (req, res, next) => {
  // const validation = validateSong(req.body);
  // if (validation.error) {
  //   const error = new Error(validation.error.details[0].message);
  //   error.statusCode = 400;
  //   next(error);
  // }
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

router.delete("/:id", (req, res) => {
  // let idDelete = songs.findIndex(
  //   (element) => element.id === parseInt(req.song.id)
  // );
  // const songsFilter = songs.splice(idDelete, idDelete < 0 ? 0 : 1);
  // let songRes = songsFilter[0];
  // res.statusCode = 200;
  // res.json(songRes);

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

module.exports = router;
