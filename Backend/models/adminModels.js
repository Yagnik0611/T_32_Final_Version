const mongoose = require("mongoose");
const {isEmail} = require('validator')
const User = require('../models/userModels')
const bcrypt = require("bcrypt")


const AdminSchema = new mongoose.Schema({

   
    
    first_name:{
        type:String,
        required : [true, "Please enter a First name."],

    },
    last_name:{
        type:String,
        required : [true, "Please enter a Last name."],

    },
   
    gender:{
        type:String,
         enum : { values: ['Male', 'Female','Other'], message: '{VALUE} is not supported' },
        // required : [true, "Please enter a Gender."],
    }
    , 
    email:{
            type:String,
            required : [true, "Please enter an Email."],
            unique: true,
            validate:[isEmail, "Please Enter a valid Email."]
    
    
        },
    
    password: {
        type: String,
        minlength: 8,
        maxlength: 32,
    },
    address:{
        type:String,
     

    },
    city:{
        type:String,
       

    },
    country:{
        type:String,
     

    },
    province:{
        type:String,
       

    },
    zip_code:{
        type:String,
       

    },
    about_me:{
        type:String,
       
     

    },
   
    isLoggedIn: {
        type: Boolean,
        default: false
    },   profileImage: {
        type: String,
        // default: false
    }
}, {
    timestamps: true
})


AdminSchema.methods.login = function() {
    this.isLoggedIn = true
    return this.save()
};

AdminSchema.methods.logout = function() {
    this.isLoggedIn = false
    return this.save()
};

// Hash the plain text password before saving the user
AdminSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err)
        }
        this.password = hash
        next()
    })
})

// Compare the plain text password with the hashed password
AdminSchema.methods.checkPassword = function (password) {
    console.log(this.password)
    return bcrypt.compare(password, this.password)
}
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;