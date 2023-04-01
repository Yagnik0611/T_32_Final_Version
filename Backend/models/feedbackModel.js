const mongoose = require("mongoose")

const {isEmail} = require('validator')

const FeedBackSchema = new mongoose.Schema({
     // required : [true, "Please enter a Gender."],
    
     email:{  type:String,
     required : [true, "Please enter an Email."],
   
     validate:[isEmail, "Please Enter a valid Email."]}
    ,
    feedback:{
        type:String,

    },
    park:{
        type:String
    },
    rating: {
        type: Number,
      
    },
    profileImage: {
        type: String,
        // default: false
    },

 
 
}, {
timestamps: true
})


const Feedback = mongoose.model('feedback', FeedBackSchema);

module.exports = Feedback;
