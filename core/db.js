const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://dWhite:MVS6YUxEY0ns0cS2@web-store.wfk81.mongodb.net/web_store",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to DB");
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "conection error"));

exports.db = db;