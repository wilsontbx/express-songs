const SongModel = require("../models/song");

const songController = {
  createOne: async (song) => {
    try {
      const newSong = new SongModel(song);
      await newSong.save();
      return newSong;
    } catch (err) {
      console.log(err);
    }
  },
  getAllSongs: async () => {},
  findById: async () => {},
  updateById: async (id, body, next) => {},
  deleteById: async (id, next) => {},
};

module.exports = songController;
