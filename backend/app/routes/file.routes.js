const { authJwt } = require("../middlewares");
const controller = require("../controllers/file.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/files", [authJwt.verifyToken], controller.getFiles);
  app.get("/api/files/download", [authJwt.verifyToken], controller.download);
  app.post('/api/files/', [authJwt.verifyToken], controller.upload)
};
