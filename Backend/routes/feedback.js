// importing router from express for api
const router = require("express").Router();
// importing model
let user = require("../models/userModels");
const User = user.getModel
let Admin = require("../models/adminModels");
let Feedback = require("../models/feedbackModel")
let Client = require("../models/clientModels");
const jwt = require("jsonwebtoken");

const { verifytoken } = require("./func");


router.post("/add", async (req, res) => {

    const data = req.body;
   
    const newFeedback = new Feedback(data);
  
    // userExists = await User.findOne({ email: user.email });
    // if(userExists){
    // if(userExists.profileImage ){
    //   newFeedback.profileImage = userExists.profileImage
    // }
   

    
    newFeedback
      .save()
      .then(() => res.json("feedback added!"))
      .catch((error) => {
        const errors = handleErrors(error);
        res.status(500).json({ errors });
      });
   
  });
  router.route('/view').get((req,res)=>{



    Feedback.find()
    .then(feedbacks => res.status(200).json(feedbacks))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/view2').get(async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    const updatedFeedbacks = [];
    for (const feedback of feedbacks) {
      console.log(feedback.email)
      const user = await User.findOne({ email: feedback.email });
  
      if (user) {
       
        const profileImage = user.profileImage;
     
        updatedFeedbacks.push({ ...feedback.toObject(), profileImage });
        
      } else {
        updatedFeedbacks.push(feedback.toObject());
      }
    }
    res.status(200).json(updatedFeedbacks);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

  
const handleErrors = (err) => {
  // screating json error for all the fields

  let errors = { first_name: "", last_name: "", email: ""};

  // catching the unique error msg for emails
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  } else if (err.message.includes("FeedBack validation failed")) {
    // looking for errors genereated from validation script
console.log()
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  } else {
    // for any other errors we run into
    errors = { message: "Error while instering New User" };
  }
  return errors;
};

  
  module.exports = router;