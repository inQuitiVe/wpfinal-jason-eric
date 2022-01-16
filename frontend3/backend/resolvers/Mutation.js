const Mutation = {
  async createFile(parent, args, { db, pubsub }, info) {
    const task = new db.Task()
    console.log("========start create File========");
    task.class = args.class;
    task.num = args.num;
    task.image = args.image;
    task.text = args.text;
    task.prob = args.prob;
    task.user = args.user;
    const res = await task.save();
    console.log(task.image);
    console.log(res);
    pubsub.publish("TASK", {
      taskrenew: task,
    });
    return task
  },

  async deleteFile(parent, args, { db, pubsub }, info) {
    const target = db.Task.findOneAndDelete({id:args.id})
    return target.id
  },

  async registerUser(parent, args, { db, pubsub }, info) {
    console.log(args);
    const repeatname = await db.User.findOne({username: args.username})
    if(repeatname) {
      return {message: "The username has been used before."}
    }
    await new db.User({username:args.username,email:args.email,password:args.password}).save()
    return {message: "Registered!"}
  },
  async logInUser(parent, args, { db }, info) {
    const user = await db.User.findOne({username:args.username})
    console.log(user);
    if (!user) return {message: "Username Not Found. Register First."}
    else if (user.password !== args.password) return {message: "Wrong Password"}
    else return {message: 'Login Succeed!'}
},
};

export default Mutation;
