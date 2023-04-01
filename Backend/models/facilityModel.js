const mongoose = require('mongoose');

const FacilitiesSchema = new mongoose.Schema({
  park: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park',
   
  },
  facilities: [{
      
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String},
    capacity: { type: Number, required: true },
    equipment: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        description: { type: String },
      }
    ],
    visitors: {
      max: { type: Number, required: true },
      min: { type: Number, required: true },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// const FacilitiesSchema = mongoose.model('Facility', facilitySchema);
module.exports = FacilitiesSchema;
 