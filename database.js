var mongoose = require('mongoose');
var ComLocation = require('./models/ComLocation');
var ComUser = require('./models/ComUser');
var data = require('./mockData');

var CREATE_DATA = false;
mongoose.connect('mongodb://localhost/comdb', (error) => {
  if (error)
    console.error(error);


  if (CREATE_DATA) {
    //just for development
    mongoose.connection.db.dropDatabase();
    // data.locations.forEach(function (item) {
    //   new ComLocation(item).save();
    // });
    // data.users.forEach(function (item) {
    //   new ComUser(item).save();
    // })
  }
});
