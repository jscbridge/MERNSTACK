const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/MERN";


  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DataBase Mongo: ON");
    })
    .catch((err) => {
      console.error(err);
    });
