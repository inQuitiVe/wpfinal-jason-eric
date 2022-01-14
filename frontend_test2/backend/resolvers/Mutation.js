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
};

export default Mutation;
