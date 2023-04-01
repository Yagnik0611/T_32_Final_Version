const mongoose = require("mongoose")
const User = require('../models/userModels')
const {isEmail} = require('validator')
const bcrypt = require("bcrypt")
const ClientSchema = new mongoose.Schema({
        
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
    , email:{
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
    profileImage: {
        type: String,
        // default: false
    }

 ,   pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
        required: true
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }],

   
isLoggedIn: {
    type: Boolean,
    default: false
}
}, {
timestamps: true
})

// Hash the plain text password before saving the user
ClientSchema.pre("save", function (next) {
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
ClientSchema.methods.checkPassword = function (password) {
    console.log(this.password)
    return bcrypt.compare(password, this.password)
}

ClientSchema.methods.addPage = function(page) {
    this.pages.push(page)
    return this.save()
}

ClientSchema.methods.deletePage = function(pageId) {
    this.pages = this.pages.filter(page => page._id.toString() !== pageId.toString())
    return this.save()
}

ClientSchema.methods.editPage = function(pageId, newPage) {
    this.pages = this.pages.map(page => {
        if (page._id.toString() === pageId.toString()) {
            return newPage
        }
        return page
    })
    return this.save()
}

ClientSchema.methods.addEvent = function(event) {
    this.events.push(event)
    return this.save()
}

ClientSchema.methods.login = function() {
    this.isLoggedIn = true
    return this.save()
}

ClientSchema.methods.logout = function() {
    this.isLoggedIn = false
    return this.save()
}

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
