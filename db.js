const db = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { dummyCollectionsMaker } = require("./controllers/todoController");

db.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.connection.on("error", () => {
  console.log("error");
});

db.connection.on("open", () => {
  const app = require("./app");
  app.listen(process.env.PORT, dummyCollectionsMaker);
});

  module.exports = db;
