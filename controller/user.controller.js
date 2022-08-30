const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");
const { secretKey } = require("../config/server.config");
// Admin is not allowed to register from here
exports.registration = async (req, res) => {
  try {
    let newUser = await User.create({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      userId: req.userId,
      height: req.body.height,
      weight: req.body.weight,
      password: bcrypt.hashSync(req.body.password, 10),
      userType: req.body.userType,
    });
    response = {
      name: newUser.name,
      email: newUser.email,
      userType: newUser.userType,
      userStatus: newUser.userStatus,
      CreatedAt: newUser.createdAt,
    };
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send("Db Error while registering new user");
    console.log(err);
    return;
  }
};

exports.login = async (req, res) => {
  // req.user is provided from middleware
  let token = jwt.sign({ id: req.user.userId }, secretKey, {
    expiresIn: "10m",
  });
  return res
    .status(200)
    .send({ message: "you have been successfully logged in", token });
};
