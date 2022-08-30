const mongoose = require("mongoose");
const { userStatuses } = require("../utils/constants");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  healthIds: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "HealthRecord",
  },
  userType: {
    type: String,
    enum: [constants.userTypes.user, constants.userTypes.admin],
    default: constants.userTypes.user,
  },
  userStatus: {
    type: String,
    enum: [
      constants.userStatuses.approved,
      constants.userStatuses.blocked,
      constants.userStatuses.pending,
    ],
    default: constants.userStatuses.approved,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
