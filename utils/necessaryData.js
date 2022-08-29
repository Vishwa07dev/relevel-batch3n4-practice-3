exports.necessaryData = async (arr) => {
  let newObj = [];
  try {
    for (let x = 0; x < arr.length; x++) {
      let record = await Health.findOne({ _id: arr[x] });
      newObj.push(record);
    }
  } catch (err) {
    console.log(err);
    return "err occured";
  }
  return newObj;
};
