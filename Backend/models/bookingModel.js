const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  facility: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  park_id: {
    type: String,
   
    required: true
  },
  booking_date: {
    type: Date,
    default: Date.now
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  equipment: [{
    type: String,
    required: true
  }],
  number_of_guests: {
    type: Number,
    required: true,
    default: 1
  }
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
