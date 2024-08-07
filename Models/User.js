const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName : {
    type : String, 
    required : true
  },
  password : {
    type : String,
    required : true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('UsersTodo', userSchema);
