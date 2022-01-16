import mongoose from "mongoose";
import dotenv from 'dotenv-defaults';
dotenv.config();

async function connect() {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser : true, useUnifiedTopology : true });
  const db = mongoose.connection
  db.once("open", () => {
    console.log("Mongo database connected!");
  });
}

export default {connect};
