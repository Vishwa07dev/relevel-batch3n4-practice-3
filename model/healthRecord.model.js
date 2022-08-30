const mongoose = require("mongoose");
const { userStatuses } = require("../utils/constants");
const constants = require("../utils/constants");

const healthSchema = new mongoose.Schema({
  height: {
    type: String,
  },
  weight: {
    type: Number,
  },
  bloodPressure: {
    type: String,
  },
  sugarLevel: {
    type: String,
  },
  temperature: {
    type: Number,
  },
  symptoms: {
    type: [String],
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
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

module.exports = mongoose.model("healthRecords", healthSchema);
