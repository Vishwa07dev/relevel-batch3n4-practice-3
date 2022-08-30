const { default: mongoose } = require("mongoose");
const User = require("../model/user.model");
const Health = require("../model/healthRecord.model");
const constants = require("../utils/constants");

exports.create = async (req, res, next) => {
  // height: req.body.height ? req.body.height : req.user.height,

  if (
    !req.body.weight &&
    !req.body.height &&
    !req.body.temperature &&
    !req.body.bloodPressure &&
    !req.body.sugarLevel &&
    !req.body.symptoms
  ) {
    return res.status(400).send("You've to provide some input");
  }
  if (req.body.height > 300 || req.body.height < 100) {
    return res
      .status(400)
      .send("Invalid height it should be less than 300 and more than 100");
  }
  // weight: req.body.height ? req.body.height : req.user.height,
  if (req.body.weight > 500 || req.body.height < 15) {
    return res
      .status(400)
      .send("Invalid weight it should be less than 500 and more than 15");
  }
  // bloodPressure: req.body.bloodPressure,
  if (req.body.bloodPressure < 50 || req.body.bloodPressure > 150) {
    return res
      .status(400)
      .send("Invalid bp it should be less than 150 and more than 50");
  }

  // sugarLevel: req.body.sugarLevel,
  if (req.body.sugarLevel < 70 || req.body.bloodPressure > 250) {
    return res
      .status(400)
      .send("Invalid sugarLevel it should be less than 250 and more than 70");
  }

  // temperature: req.body.temperature,
  if (req.body.temperature < 32 || req.body.temperature > 50) {
    return res
      .status(400)
      .send("Invalid temperature it should be less than 50C and more than 32C");
  }
  next();
};

exports.update = async (req, res, next) => {
  if (!req.params.id) {
    return res
      .status(400)
      .send("you have to provide id of the record you want to change");
  }
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res
      .status(400)
      .send("you have to provide a valid id of the record you want to change");
  }

  let ifRecordExist;
  try {
    ifRecordExist = await Health.findOne({ _id: req.params.id });
    if (!ifRecordExist) {
      return res
        .status(400)
        .send(
          "you have to provide a valid id of the record you want to change"
        );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err occured");
  }
  if (
    !req.body.weight &&
    !req.body.height &&
    !req.body.temperature &&
    !req.body.bloodPressure &&
    !req.body.sugarLevel &&
    !req.body.symptoms
  ) {
    return res.status(400).send("You've to provide some input");
  }
  // height: req.body.height ?
  if (req.body.height > 300 || req.body.height < 100) {
    return res
      .status(400)
      .send("Invalid height it should be less than 300 and more than 100");
  }
  // weight: req.body.height ? req.body.height : req.user.height,
  if (req.body.weight > 500 || req.body.height < 15) {
    return res
      .status(400)
      .send("Invalid weight it should be less than 500 and more than 15");
  }
  // bloodPressure: req.body.bloodPressure,
  if (req.body.bloodPressure < 50 || req.body.bloodPressure > 150) {
    return res
      .status(400)
      .send("Invalid bp it should be less than 150 and more than 50");
  }

  // sugarLevel: req.body.sugarLevel,
  if (req.body.sugarLevel < 70 || req.body.bloodPressure > 250) {
    return res
      .status(400)
      .send("Invalid sugarLevel it should be less than 250 and more than 70");
  }

  // temperature: req.body.temperature,
  if (req.body.temperature < 32 || req.body.temperature > 50) {
    return res
      .status(400)
      .send("Invalid temperature it should be less than 50C and more than 32C");
  }
  req.record = ifRecordExist;
  next();
};

exports.updateRecord = async (req, res, next) => {
  if (req.user.userType == constants.userTypes.admin) {
    if (!req.body.id) {
      return res.status(400).send("you have to provide id of the user");
    }
    if (!mongoose.SchemaTypes.ObjectId(req.body.id)) {
      return res
        .status(400)
        .send("you have to provide a valid id of the user ");
    }
    let ifRecordExist;
    try {
      ifRecordExist = await Health.findOne({ _id: req.body.id });
      if (!ifRecordExist) {
        return res
          .status(400)
          .send("you have to provide a valid id of the user");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server err occured");
    }
  }
  req.id = req.body.id;
  next();
};
exports.getUsersRecord = async (req, res, next) => {
  if (req.user.userType == constants.userTypes.admin) {
    if (!req.body.id) {
      return res.status(400).send("you have to provide id of the user");
    }
    if (!mongoose.SchemaTypes.ObjectId(req.body.id)) {
      return res
        .status(400)
        .send("you have to provide a valid id of the user ");
    }
    let ifRecordExist;
    try {
      ifRecordExist = await Health.findOne({ _id: req.body.id });
      if (!ifRecordExist) {
        return res
          .status(400)
          .send("you have to provide a valid id of the user");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server err occured");
    }
  }
  req.id = req.body.id;
  next();
};
exports.delete = async (req, res, next) => {
  if (
    req.user.userType !== constants.userTypes.admin ||
    !req.user.HealthIds.includes(req.params.id)
  ) {
    return res.status(400).send("You are not authorized for this request");
  }
  if (!req.params.id) {
    return res.status(400).send("you have to provide id of the user");
  }
  if (!mongoose.SchemaTypes.ObjectId(req.params.id)) {
    return res.status(400).send("you have to provide a valid id of the user ");
  }
  let ifRecordExist;
  try {
    ifRecordExist = await Health.findOne({ _id: req.params.id });
    if (!ifRecordExist) {
      return res.status(400).send("you have to provide a valid id of the user");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server err occured");
  }

  req.id = req.body.id;
  next();
};
