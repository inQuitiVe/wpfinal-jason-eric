const Query = {
    async logInUser(parent, args, { db }, info) {
        const user = await db.User.findOne({username:args.username})
        if (!user) throw new Error("username not found")
        else if (user.password !== args.password) throw new Error("password error");
        return user
    },
}

export default Query;
