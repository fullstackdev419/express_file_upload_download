const uploadFile = require("../middlewares/upload");
const db = require("../models");
const File = db.file;

const getFiles = (req, res) => {
  File.
    find().
    exec((err, files) => {
      if (err) {
        res.status(500).send("Server Error");
      }
      res.status(200).send(files);
    });
};

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const file = new File({
      filename: req.file.originalname,
    });
    file.save((err, file) => {
      res.status(200).send({
        filename: req.file.originalname,
      });
    })
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const download = (req, res) => {
  const fileName = req.query.id;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  download,
  getFiles
};