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
    let song = songs.find((song) => song.id === parseInt(id));
    req.song = song;
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
    const idFind = songs.findIndex(
        (element) => element.id === parseInt(req.song.id)
    );

    songs[idFind].name = req.body.name;
    songs[idFind].artist = req.body.artist;

    res.statusCode = 200;
    res.json(songs[idFind]);
});

app.delete("/songs/:id", (req, res) => {
    let idDelete = songs.findIndex(
        (element) => element.id === parseInt(req.song.id)
    );
    const songsFilter = songs.splice(idDelete, idDelete < 0 ? 0 : 1);
    let songRes = songsFilter[0];
    res.statusCode = 200;
    res.json(songRes);
});

const movies = [];

app.param("movieID", (req, res, next, movieID) => {
    const movie = movies.find((movie) => movie.id === parseInt(movieID));
    req.movie = movie;
    next();
});

app.post("/movies", (req, res) => {
    movies.push({
        id: movies.length + 1,
        movieName: req.body.movieName,
    });
    res.status(201).json(movies);
});

app.get("/movies", (req, res) => {
    res.status(200).json(movies);
});

app.put("/movies/:movieID", (req, res) => {
    const idFind = movies.findIndex(
        (element) => element.id === parseInt(req.movie.id)
    );

    movies[idFind].movieName = req.body.movieName;

    res.status(200).json(movies);
});

app.delete("/movies/:movieID", (req, res) => {
    const idFind = movies.findIndex(
        (element) => element.id === parseInt(req.movie.id)
    );

    const moviesDeleted = movies.splice(idFind, idFind < 0 ? 0 : 1);

    res.status(200).json(moviesDeleted);
});

module.exports = app;
