const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true
  },
  park_name:{
    type:String
    
  },
  client_name:{
    type: String,
  },

  park_id: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  client_pic:{
    type:String
  }
 ,
  land_title_deed: {
    type: String,
    required: true
  },
  purchase_agreement: {
    type: String,
    required: true
  },
  zoning_by_laws: {
    type: String,
    required: true
  },
  building_permits: {
    type: String,
    required: true
  },
  accepted: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
