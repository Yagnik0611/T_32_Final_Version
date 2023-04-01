const mongoose = require('mongoose');

const HomePage = new mongoose.Schema({
  park: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park',
 
  },
  title: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  events: {
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
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  info: [{
    type: String,
    required: true
  }],
  hours: [{
    day: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  }],
  clientId: {
    type: String,
    required: true
  },
  backgroundImg: {
    type: String,
    // default: false
}
});

// const HomePage = mongoose.model('HomePage', homeSchema);

module.exports = HomePage;
