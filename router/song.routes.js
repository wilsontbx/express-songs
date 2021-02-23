const express = require("express");
const router = express.Router();

const songs = [
  {
    id: 1,
    name: "someSongName",
    artist: "someSongArtist",
  },
  {
    id: 2,
    name: "anotherSongName",
    artist: "anotherArtist",
  },
];

router.param("id", (req, res, next, id) => {
  let song = songs.find((song) => song.id === parseInt(id));
  req.song = song;
  next();
});

router.get("/", (req, res) => {
  res.status(200).json(songs);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const songsFilter = songs.filter((element) => element.id == id);
  res.statusCode = 200;
  res.json(songsFilter);
});

router.get("/:id", (req, res) => {
  res.statusCode = 200;
  res.json({
    songs: songs,
  });
});

router.post("/", (req, res) => {
  const newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist,
  };
  res.statusCode = 201;
  res.json({
    songs: newSong,
  });
});

router.put("/:id", (req, res) => {
  const idFind = songs.findIndex(
    (element) => element.id === parseInt(req.song.id)
  );

  songs[idFind].name = req.body.name;
  songs[idFind].artist = req.body.artist;

  res.statusCode = 200;
  res.json(songs[idFind]);
});

router.delete("/:id", (req, res) => {
  let idDelete = songs.findIndex(
    (element) => element.id === parseInt(req.song.id)
  );
  const songsFilter = songs.splice(idDelete, idDelete < 0 ? 0 : 1);
  let songRes = songsFilter[0];
  res.statusCode = 200;
  res.json(songRes);
});

module.exports = router;
