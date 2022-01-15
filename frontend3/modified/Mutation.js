import shortid from 'shortid'
import { createWriteStream } from 'fs'

const storeUpload = async ({ stream, filename })=> {
  const id = shortid.generate()
  const path = `images/${id}`
  const result = Promise.any(
    new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({path }))
      .on('error', reject),
  ))
  return result
}

const processUpload = async upload => {
  const {stream, filename, mimetype, encoding} = await upload
  const {path} = await storeUpload({ stream, filename })
  return path
}

const Mutation = {
  async createFile(parent, args, { db, pubsub }, info) {
    const task = new db.Task()
    task.id = args.id;
    task.class = args.class;
    task.num = args.num;
    task.text = args.task;
    task.prob = args.prob;
    task.image = await processUpload(args.image);
    task.save()
    const user = db.User.findOne({username:args.user})
    user.task = [...user.task,task.id]
    user.save()
  },

  async deleteFile(parent, args, { db, pubsub }, info) {
    const target = db.Task.findOneAndDelete({id:args.id})
    return target.id
  },

  async registerUser(parent, args, { db, pubsub }, info) {
    console.log(args);
    const repeatname = await db.User.findOne({username: args.username})
    // const repeatmail = await db.User.findOne({email: args.email})
    //db.User.dropIndexes()
    //console.log(db.User.getIndexes())
    if(repeatname) {
      return {message: "The username has been used before."}
    }
    await new db.User({username:args.username,email:args.email,password:args.password}).save()
    return {message: "Registered!"}
  },
  async logInUser(parent, args, { db }, info) {
    console.log("++++++++++++++++++++++");
    const user = await db.User.findOne({username:args.username})
    console.log(user);
    if (!user) return {message: "Username Not Found. Register First."}
    else if (user.password !== args.password) return {message: "Wrong Password"}
    else return {message: 'Login Succeed!'}
},
};

export default Mutation;
