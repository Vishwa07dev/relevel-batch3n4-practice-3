const Health = require("../model/healthRecord.model");

exports.necessaryData = async (arr) => {
  console.log(arr);
  let newObj = [];
  try {
    for (let x = 0; x < arr.length; x++) {
      let record = await Health.findOne({ _id: arr[x] });
      newObj.push(record);
      console.log(record);
    }
    console.log(newObj);
  } catch (err) {
    console.log(err);
    return "err occured";
  }
  return newObj;
};
