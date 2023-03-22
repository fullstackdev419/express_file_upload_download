const mongoose = require("mongoose");

const File = mongoose.model(
  "File",
  new mongoose.Schema({
    filename: String,
  })
);

module.exports = File;
