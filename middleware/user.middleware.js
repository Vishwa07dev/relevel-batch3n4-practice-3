const uuid = require("uuid");
const bcrypt = require("bcrypt");

const User = require("../model/user.model");
const constants = require("../utils/constants");

exports.registration = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send("You have to provide a valid name");
  }
  req.body.name = req.body.name.trim();
  if (req.body.name.length < 3) {
    res
      .status(400)
      .send(
        "You have to provide a valid name, it has to be atleast 3 characters long"
      );
  }
  //   age
  if (!req.body.age) {
    res.status(400).send("You have to provide a valid age");
  }
  if (req.body.age < 5 || req.body.age > 80) {
    res
      .status(400)
      .send("You have to provide a valid age, it has to be between 5 and 80");
  }
  if (!req.body.height) {
    res.status(400).send("You have to provide a valid height");
  }
  if (req.body.age < 100 || req.body.age > 300) {
    res
      .status(400)
      .send(
        "You have to provide a valid age, it has to be between 100cm and 300cm"
      );
  }
  if (!req.body.weight) {
    res.status(400).send("You have to provide a valid weight");
  }
  if (req.body.age < 15 || req.body.age > 500) {
    res
      .status(400)
      .send(
        "You have to provide a valid age, it has to be between 15kg and 500kg"
      );
  }
  //   email: req.body.email,
  if (!req.body.email) {
    res.status(400).send("You have to provide a valid unique emailId");
  }
  if (!constants.emailRegex.test(req.body.email)) {
    res
      .status(400)
      .send("You have to provide a valid emailId, this is invalid");
  }
  let ifExistingUser;
  try {
    ifExistingUser = await User.findOne({ email: req.body.email });
    if (ifExistingUser) {
      res.status(400).send("This emailId is already registered with us");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error has occured");
  }
  //   userId: req.userId,
  req.userId = uuid.v4();
  //   password,
  if (!req.body.password) {
    res.status(400).send("You have not provided a password,");
  }
  //  I use the following script for min 8 letter password,
  //    with at least a symbol, upper and lower case letters and a number
  if (!constants.passwordRegex.test(req.body.password)) {
    res
      .status(400)
      .send(
        "min 8 letter password, with atleast a symbol, upper and lower case letters and a number is to be provided"
      );
  }
  next();
};

exports.login = async (req, res, next) => {
  //check emailId
  if (!req.body.email) {
    res.status(400).send("You've to provide an emailId");
  }
  if (constants.emailRegex.test(req.body.email)) {
    res.status(400).send("This emailId is not valid");
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      res
        .status(400)
        .send(
          "This emailId is not registered with us, try to register with us"
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error has occured");
  }
  if (!req.body.password) {
    res.status(400).send("You've to provide a password");
  }
  if (constants.passwordRegex.test(req.body.password)) {
    res.status(400).send("This password is incorrect");
  }
  if (!bcrypt.compareSync(req.body.password, existingUser.password)) {
    res.status(400).send("This password is incorrect");
  }
  if (constants.userStatuses.approved !== existingUser.userStatus) {
    res.status(400).send("You are not allowed to make this request");
  }
  req.user = existingUser;
  next();
};
