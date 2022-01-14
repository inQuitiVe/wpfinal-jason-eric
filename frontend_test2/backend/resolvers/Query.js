const Query = {
    async getUserFile(parent, args, { db }, info) {
        let result = [];
        const user = await db.User.find({username:args.name})
        result = user.map(async(task) => {
            return await db.Task.find({id:task.id})
        })
        return result
    },
}

export default Query;
