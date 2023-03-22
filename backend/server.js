const dbConfig = require("./app/config/db.config");
const app = require('./app');

global.__basedir = __dirname;

const db = require("./app/models");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
