const constants = require("./constants");

module.exports = async (User, bcrypt) => {
    await User.collection.drop();

    const user1 = await User.create({
        name : "user1",
        userId : "u1",
        email : "user1@gmail.com",
        password : bcrypt.hashSync("welcome", 8),
        healthRecords : []
    });

    const admin = await User.create({
        name : "admin",
        userId : "admin",
        email : "admin@gmail.com",
        password : bcrypt.hashSync("welcome", 8),
        userType : constants.userTypes.admin
    })

    const user2 = await User.create({
        name : "user2",
        userId : "u2",
        email : "user2@gmail.com",
        password : bcrypt.hashSync("welcome", 8),
        healthRecords : []
    });
}