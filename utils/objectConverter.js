exports.reportResponse=(users)=>{
     reportResult=[];
    users.forEach(user => {
        reportResult.push({
            height:user.height,
            weight:user.weight,
            userId:user.userId,
            bloodPressure:user.bloodPressure,
            sugarLevel:user.sugarLevel,
            temperature:user.temperature,
            symptoms:user.symptoms
        });
    });
    return reportResult;
};
exports.userResponse=(users)=>{
    userResult=[];
    users.forEach(user=>{
        userResult.push({
            name:user.name,
            userId:user.userId,
            address:user.address,
            email:user.email,
            userType:user.userType,
            userStatus:user.userStatus,
            healthReport:user.healthReport
        });
    });
    return userResult;
}