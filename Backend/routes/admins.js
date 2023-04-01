// importing router from express for api
const router = require('express').Router()
// importing model
let Admin = require('../models/adminModels')


const jwt = require("jsonwebtoken");
const { verifytoken } = require("./func");
const multer = require("multer")

const path = require('path');
const fs = require('fs');
const uuid = require('uuid')
// Location where you want to store the profile Pic 
const storage = multer.diskStorage({

  destination:(req,file,callback)=>{
    callback(null,'./ProfileImgs/')
  },
  
    filename: function(req, file, cb) {
      const uniqueFileName = `${Date.now()}-${uuid.v4()}-${file.originalname}`;
      cb(null, uniqueFileName);
  }


})

const upload = multer({storage:storage})
router.get("/profile/image/:id", (req, res) => {
  const email = req.params.id;

  Admin.findOne({ email: email })
    .then((admin) => {
      const fileName = admin.profileImage;
      
      try {
        const filePath = path.join(__dirname, "..", "ProfileImgs", fileName);
     
        fs.stat(filePath, (err, stat) => {
          if (err) {
            console.error(`Error: ${err.message}`);
            return res.status(400).send("Error: " + err.message);
          }
  
          if (!stat.isFile()) {
            console.error(`Error: ${filePath} is not a file`);
            return res.status(400).send(`Error: ${filePath} is not a file`);
          }
  
          res.sendFile(filePath);
        });
      } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(400).send("Error: " + err.message);
      }
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});
// profile img 
router.route("/add/profileimg").post((req, res) => {
  const adm = req.body;
  const newAdmin = new Admin(adm);

  newAdmin
    .save()
    .then(() => res.json("Admin added!"))
    .catch((error) => {
      const errors = handleErrors(error);
      res.status(500).json({ errors });
    });
  });

  router.route("/update/profileimg/:id").put(upload.single("profileImage"),(req, res) => {
    const email = req.params.id;
    const newAdmin = req.body;

    Admin.findOne({ email: email })
      .then((admin) => {
        console.log(  req.file.filename)
        admin.updateOne({profileImage :req.file.filename})
          .then(() => res.json("Admin updated!"))
        .catch((error) => {
          const erro = handleErrors(error);
          res.status(500).json({ erro });
        });
    })
    .catch((error) => {
      res.status(500).send({ message: "Can not find Admin with given id." });
    });
});
// view admin 
router.route('/').get((req,res)=>{
    Admin.find()
    .then(admins => res.status(200).json(admins))
    .catch(err => res.status(400).json('Error: ' + err))
})

//--------------
router.get("/:id", verifytoken, (req, res) => {
  try {
    const email = req.params.id;

    Admin.findOne({ email: email }).then((Admin) => {
      if (Admin) {
        res.status(200).send(Admin);
      } else {
        res.status(500).send({ message: "Can not find Admin with given id." });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// delete Admin

router.route("/:id").delete((req, res) => {
  const id = req.params.id;

  Admin.findByIdAndDelete(id)
    .then(() => res.status(200).json("Admin deleted"))
    .catch((error) => {
      res.status(500).send({ message: "Can not find Admin with given id." });
    });
});
// update Admin with id

router.route("/update/:id").put((req, res) => {
  const email = req.params.id;
  const newAdmin = req.body;

  Admin.findOne({ email: email })
    .then((Admin) => {
      Admin.updateOne(newAdmin)
        .then(() => res.json("Admin updated!"))
        .catch((error) => {
          const erro = handleErrors(error);
          res.status(500).json({ erro });
        });
    })
    .catch((error) => {
      res.status(500).send({ message: "Can not find Admin with given id." });
    });
});

router.route("/updatePassword/:id").put(async (req, res) => {
  const email = req.params.id;
  const Admin = req.body;

  
  const AdminExists = await Admin.findOne({ email: email});
  // if Admin is there we validate password and if its right we sent 200 logged in
  if (AdminExists) {
    const isValid = await AdminExists.checkPassword(Admin.currentPassword);

    if (isValid) {
     
      Admin.update( {password:Admin.password})
        .then(() => res.json("Password Updated!"))
        .catch((error) => {
          const erro = handleErrors(error);
          res.status(500).json({ erro });
        });
      
    } else {
      return res
        .status(500)
        .send({ status: false, message: "Invalid  password" });
    }
  }
});
//----------------------
router.route('/add').post((req,res)=>{
 const adm = req.body
  const newAdmin= new  Admin({
    Admin : adm
  })

newAdmin.save()
  .then(() => res.json('admin added!'))
  .catch(error => 
   { const errors = handleErrors(error);
    res.status(500).json({errors})});
});
   

// router.route('/:id').get( (req,res)=>{

// const id = req.params.id
 
// Admin.findById(id)
// .then(admin=> res.status(200).send(admin))
// .catch(() =>{  res.status(500).send({message: "Can not find Admin with given id."})})

// })

// // delete admin

// router.route('/:id').delete( (req,res)=>{

//     const id = req.params.id
     
//     Admin.findByIdAndDelete(id)
//     .then(()=> res.status(200).json("Admin deleted"))
//     .catch(error =>{  res.status(500).send({message: "Can not find Admin with given id."})})
    
//     })
// // update admin with id

// router.route("/update/:id").put((req,res)=>{

//     const id = req.params.eid
//     const newAdmin = req.body

//     EmployeeModel.findById(id)
//     .then(admin =>{
//         admin = newAdmin
//         admin.save()
//         .then(() => res.json('Admin updated!'))
//         .catch(error => 
//          { const errors = handleErrors(error);
//           res.status(500).json({errors})});
//       })
//      .catch((error) =>  res.status(500).send({message: "Can not find Admin with given id."}));
// })






/// all methods needed for admin
const handleErrors = (err) => {
    // screating json error for all the fields 
  
      let errors = { first_name: '', last_name: '' ,email: '' };
    
  // catching the unique error msg for emails
      if (err.code === 11000) {
        errors.email = 'This email is already registered';
        return errors;
      }
  
    else if (err.message.includes('Admin validation failed')) {
      // looking for errors genereated from validation script 
  
      Object.values(err.errors).forEach(({ properties }) => {
        
        errors[properties.path] = properties.message;
       
      });
  
       } 
       else{
          // for any other errors we run into 
          errors={message:"Error while instering New Admin"}
       }
    return errors;
    
  }
  module.exports = router;