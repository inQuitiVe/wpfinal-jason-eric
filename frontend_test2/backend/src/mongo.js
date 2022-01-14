import mongoose from "mongoose";
import "dotenv-defaults/config.js";

async function connect() {
  mongoose.connect('mongodb+srv://ericchiu:ericchiu123@cluster0.smwju.mongodb.net/WPFinal?retryWrites=true&w=majority', { useNewUrlParser : true, useUnifiedTopology : true });
  const db = mongoose.connection
  db.once("open", () => {
    console.log("Mongo database connected!");
    console.log(db.User);
  });
}

export default {connect};
