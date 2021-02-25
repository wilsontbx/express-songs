const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
});

const SongModel = mongoose.model("Song", SongSchema);
module.exports = SongModel;
