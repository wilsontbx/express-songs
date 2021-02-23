const express = require("express");
const app = express();
app.use(express.json());

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

app.param("id", (req, res, next, id) => {
    const name = "TomSong";
    const artist = "Tom";
    const data = { id, name, artist };
    req.id = data;
    next();
});

// app.use((req, res, next) => {
//     console.log("common middleware songs is called");
//     next();
// });

// app.get("/songs", (req, res, next) => {
//     console.log("middleware songs is called");
//     next();
// });

app.get("/songs", (req, res) => {
    res.status(200).json(songs);
});

app.get("/songs/:id", (req, res) => {
    const id = req.params.id;
    const songsFilter = songs.filter((element) => element.id == id);
    res.statusCode = 200;
    res.json(songsFilter);
});

app.get("/songs/:id", (req, res) => {
    res.statusCode = 200;
    res.json({
        songs: songs,
    });
});

// app.post("/songs", (req, res, next) => {
//     console.log("middleware songs is called(post)");
//     next();
// });

app.post("/songs", (req, res) => {
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

app.put("/songs/:id", (req, res) => {
    const id = req.params.id;
    const idFind = songs.findIndex((element) => element.id === parseInt(id));

    songs[idFind].name = req.body.name;
    songs[idFind].artist = req.body.artist;

    res.statusCode = 200;
    res.json(songs[idFind]);
});

app.delete("/songs/:id", (req, res) => {
    const id = req.params.id;
    let idDelete = songs.findIndex((element) => element.id === parseInt(id));
    const songsFilter = songs.splice(idDelete, idDelete < 0 ? 0 : 1);

    let songRes = songsFilter[0];
    console.log(songRes);
    res.statusCode = 200;
    res.json(songRes);
});

module.exports = app;
