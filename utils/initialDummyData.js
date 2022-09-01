const constants = require("./constants");

module.exports = async (User,HealthRecord, bcrypt) => {
    const user1 = await User.create({
        name : "user1",
        userId : "u1",
        email : "user1@gmail.com",
        password : bcrypt.hashSync("welcome", 8),
        healthRecords : []
    });
}