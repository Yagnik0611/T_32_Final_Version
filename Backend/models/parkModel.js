const mongoose = require('mongoose');
const FacilitiesSchema = require('./facilityModel');
const HomeSchema = require('./homeModel')
const EventsSchema = require('./eventModel')
const MapPageSchema = require('./mapModel')


const ParkSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    clientId: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
   
    description: {
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
    home: {
      type: HomeSchema,
      required: true
    },
    facilities: {
      type: FacilitiesSchema,
      required: true
    },
    events: {
      type: EventsSchema,
      required: true
    },
    map: {
      type: MapPageSchema,
      
    },
    accepted: {
      type: Boolean,
      default: false
    }
  });
  const Park = mongoose.model('Park', ParkSchema);
  module.exports = Park;
