import mongoose from "mongoose";


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  })
);

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    class : String,
    num : Number,
    image: [String],
    text: [String],
    prob: [Number],
    user: String,

  })
)


const db = {User,Task};

export default db;