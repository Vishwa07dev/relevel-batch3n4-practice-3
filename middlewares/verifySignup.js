

const verifySignUp = (req, res, next)=>{
    if(!req.body.name){
        res.status(400).send({
            message : "Please Provide the name !"
        })
        return;
    }
    if(!req.body.userId){
        res.status(400).send({
            message : "Please Provide the userId !"
        })
        return;
    }
    if(!req.body.email){
        res.status(400).send({
            message : "Please Provide the email !"
        })
        return;
    }
    if(!req.body.password){
        res.status(400).send({
            message : "Please Provide the password !"
        })
        return;
    }
    next();
}

const verifySignIn = (req, res, next) =>{

    if(!req.body.userId){
        res.status(400).send({
            message : "Please Provide the userId"
        });
        return;
    }
    if(!req.body.password){
        res.status(400).send({
            message : "Please Provide the password"
        });
        return;
    }
    next();
}

const verifySignupBodies = {
    verifySignUp,
    verifySignIn
}

module.exports = verifySignupBodies;