const mongoose = require('mongoose');

const dat = {
  type: {
    type: String,
    require: true
  },
  link: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    required: false,
  },
  witnesses: {
    type: Array,
    require: false,
  },
  isSubcommittee: {
    type: Boolean,
    require: true,
  },
  subcommittee: {
    type: String,
    require: false
  },
};

module.exports = {
  // Senate Committees
  senate: [
    mongoose.model('SFRC', dat),
    mongoose.model('SASC', dat),
    mongoose.model('SVAC', dat),  
    mongoose.model('SAGC', dat),
    mongoose.model('SAPC', dat),
    mongoose.model('SBNK', dat),
    mongoose.model('SBDG', dat),
    mongoose.model('SSTR', dat),
    mongoose.model('SNAT', dat),
    mongoose.model('SENV', dat),
    mongoose.model('SFIN', dat),
    mongoose.model('SHLP', dat),
    mongoose.model('SHSC', dat),
    mongoose.model('SIND', dat),
    mongoose.model('SJUD', dat),
    mongoose.model('SRLE', dat),
    mongoose.model('SETH', dat),
    mongoose.model('SSCI', dat),
    mongoose.model('SSBS', dat),
    mongoose.model('SVET', dat)
  ],
  // House Committees
  house: [
    mongoose.model('HFAC', dat),
    mongoose.model('HASC', dat),
    mongoose.model('HVAC', dat),
    mongoose.model('HHSC', dat),
    mongoose.model('HAGC', dat),
    mongoose.model('HAPC', dat),
    mongoose.model('HBUC', dat),
    mongoose.model('HELP', dat),
    mongoose.model('NRGY', dat),
    mongoose.model('FISV', dat),
    mongoose.model('ADMN', dat),
    mongoose.model('NTTY', dat),
    mongoose.model('OVST', dat),
    mongoose.model('SCNC', dat),
    mongoose.model('SMBS', dat),
    mongoose.model('TRNS', dat),
    mongoose.model('WYMN', dat),
    mongoose.model('CLMT', dat),
  ]
};
