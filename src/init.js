const User = require('./models/user.model');
const healthRecord = require('./models/healthRecord.model');
const bcrypt = require('bcryptjs');

module.exports = async () => {

    await User.collection.drop();
    await healthRecord.collection.drop();

    try {
        const adminUser = await User.create({
            name: "admin",
            email: "admin@email.com",
            userId: "admin",
            password: bcrypt.hashSync("Welcome1", 8),
            userType: "ADMIN",
            userStatus: "APPROVED",
        });

        console.log(adminUser);

    } catch (err) {
        console.log("Error while initializing db", err.message);
        
    }
}