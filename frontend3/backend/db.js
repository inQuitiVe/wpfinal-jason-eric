import mongoose from "mongoose";


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    task: [{type:mongoose.Schema.Types.ObjectId,ref:"usertask"}], 
  })
);

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    id : {type:mongoose.Schema.Types.ObjectId,ref:"Task"},
    class : String,
    num : Number,
    image : [String],
    text : [String],
    prob : [Number],
  })
)


const db = {User,Task};

export default db;