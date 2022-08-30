exports.userResponse=(users)=>{
     userResult=[];
    users.forEach(user => {
        userResult.push({
            height:user.height,
            weight:user.weight,
            userId:user.userId,
            bloodPressure:user.bloodPressure,
            sugarLevel:user.sugarLevel,
            temperature:user.temperature,
            symptoms:user.symptoms
        });
    });
    return userResult;
}