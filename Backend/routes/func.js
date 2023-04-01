const jwt = require("jsonwebtoken")

function verifytoken(req,res,next){
    if( req.headers['authorization'] !== undefined){
        const   bearerHeader = req.headers['authorization']
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]
        jwt.verify(bearerToken,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                res.status(403).send({ status : false, message: "Invalid JWT token"})
            }else{
                req.user = user;
                next()
            }
        })
    }else{
        res.status(403).send("Please provide Valid JWT token")
    }
}
const handleErrors = (err) => {
    // screating json error for all the fields
  
    let errors = { first_name: "", last_name: "", email: "", gender: "" };
  
    // catching the unique error msg for emails
    if (err.code === 11000) {
      errors.email = "that email is already registered";
      return errors;
    } else if (err.message.includes("User validation failed")) {
      // looking for errors genereated from validation script
  
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    } else {
      // for any other errors we run into
      errors = { message: "Error while instering New User" };
    }
    return errors;
  };

exports.verifytoken = verifytoken

exports.handleErrors =handleErrors