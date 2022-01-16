const Query = {
    async getUserFile(parent, args, { db }, info) {
        const user = await db.Task.find({user:args.username,class:args.class})
        console.log(user);
        return user
    },
}

export default Query;
