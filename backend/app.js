const express = require("express");
const cors = require("cors");

global.__basedir = __dirname;

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


require("./app/routes/auth.routes")(app);
require("./app/routes/file.routes")(app);

module.exports = app;
