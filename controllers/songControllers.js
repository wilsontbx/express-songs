const SongModel = require("../models/song");

const songController = {
  createOne: async (song, next) => {
    try {
      const newSong = new SongModel(song);
      await newSong.save();
      return newSong;
    } catch (err) {
      return err;
    }
  },
  getAllSongs: async (next) => {
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
  updateById: async (id, body, next) => {
    try {
      const updatedSong = await SongModel.findOneAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return updatedSong;
    } catch (err) {
      return err;
    }
  },
  deleteById: async (id, next) => {
    try {
      const deletedSong = await SongModel.findOneAndDelete(id);
      return deletedSong;
    } catch (err) {
      next(err);
    }
  },
};

module.exports = songController;
