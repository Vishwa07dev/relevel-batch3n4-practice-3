const constant = require("./constant");
module.exports = async(User, HealthTrack, bcrypt) => {
    await User.collection.drop();
    await HealthTrack.collection.drop();

    const user1 = await User.create({
        name: "Arun",
        userId: "2342553",
        email: "user1@gmail.com",
        password: bcrypt.hashSync("welcome", 8),
  
    });

    const admin = await User.create({
        name: "admin",
        userId: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("welcome", 8),
        userType: constants.userTypes.admin
    })

    const user2 = await User.create({
        name: "samm",
        userId: "u21223",
        email: "user2@gmail.com",
        password: bcrypt.hashSync("welcome", 8),
       
    });
}
