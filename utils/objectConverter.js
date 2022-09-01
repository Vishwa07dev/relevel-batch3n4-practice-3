exports.sendRecord = (record)=>{

    const reportObj = {
        healthRecordId : record._id,
        customerId : record.customerId,
        height : record.height,
        weight : record.weight,
        bloodPressure : record.bloodPressure,
        sugerLevel : record.sugerLevel,
        temprature : record.temprature,
        symptoms : record.symptoms
    }

    return reportObj;
}

exports.sendAllRecords = (records)=>{
    recordArray = [];

    records.forEach(record =>{
        recordArray.push({
            healthRecordId : record._id,
            customerId : record.customerId,
            height : record.height,
            weight : record.weight,
            bloodPressure : record.bloodPressure,
            sugerLevel : record.sugerLevel,
            temprature : record.temprature,
            symptoms : record.symptoms
        });
    });
    return recordArray;
}