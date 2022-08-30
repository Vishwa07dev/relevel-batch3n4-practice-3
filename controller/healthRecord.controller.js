const Health = require("../model/healthRecord.model");
const constants = require("../utils/constants");
const necessaryData = require("../utils/necessaryData");

exports.create = async (req, res) => {
  let record = {
    height: req.body.height ? req.body.height : req.user.height,
    weight: req.body.weight ? req.body.weight : req.user.weight,
    bloodPressure: req.body.bloodPressure,
    sugarLevel: req.body.sugarLevel,
    temperature: req.body.temperature,
    symptoms: req.body.symptoms,
    userId: req.user._id,
  };
  try {
    let newRecord = await Health.create(record);
    await req.user.healthIds.push(newRecord);
    await req.user.save();
    return res.status(201).send(`successfully added ${newRecord}`);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error try again");
  }
};

exports.update = async (req, res) => {
  (req.record.height = req.body.height ? req.body.height : req.record.height),
    (req.record.weight = req.body.weight ? req.body.weight : req.record.weight),
    (req.record.bloodPressure = req.body.bloodPressure
      ? req.body.bloodPressure
      : req.record.bloodPressure),
    (req.record.sugarLevel = req.body.sugarLevel
      ? req.body.sugarLevel
      : req.record.bloodPressure),
    (req.record.temperature = req.body.temperature
      ? req.body.temperature
      : req.record.temperature),
    (req.record.symptoms = req.body.symptoms
      ? req.body.symptoms
      : req.record.symptoms),
    (req.record.updatedAt = Date.now());

  try {
    await req.record.save();
    return res.status(200).send(req.record);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error try again");
  }
};

exports.getUserRecord = async (req, res) => {
  if (req.user.userType == constants.userTypes.admin) {
    req.health = req.id;
  } else {
    req.health = req.user;
  }
  try {
    let records = await necessaryData.necessaryData(req.health.healthIds);
    if (records !== "err occured") return res.status(200).send(records);
    else {
      return res.status(500).send("Internal server error try again");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error try again");
  }
};

exports.allRecords = async (req, res) => {
  try {
    let allRecords = await Health.find();
    return res.status(200).send(allRecords);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error try again");
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    await Health.deleteOne({ _id: req.params.id });
    Health.save();
    return res.status(204).send("Successfully Deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error try again");
  }
};
