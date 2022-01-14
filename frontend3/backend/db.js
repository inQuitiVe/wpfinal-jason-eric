import mongoose from "mongoose";


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: { 
      type: String, 
      unique: true },
    task: [mongoose.Schema.Types.ObjectId], 
  })
);

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    class : String,
    num : Number,
    image : [String],
    text : [String],
    prob : [Number],
  })
)


const db = {User,Task};

export default db;