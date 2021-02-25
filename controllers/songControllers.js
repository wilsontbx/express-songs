const SongModel = require("../models/song");

const songController = {
  createOne: async (song) => {
    try {
      const newSong = new SongModel(song);
      await newSong.save();
      return newSong;
    } catch (err) {
      return err;
    }
  },
  getAllSongs: async () => {
    try {
      const allSong = await SongModel.find();
      return allSong;
    } catch (err) {
      return err;
    }
  },
  findById: async (id) => {
    try {
      const findSong = await SongModel.findById(id);
      return findSong;
    } catch (err) {
      return err;
    }
  },
  updateById: async (id, body, next) => {},
  deleteById: async (id, next) => {},
};

module.exports = songController;
