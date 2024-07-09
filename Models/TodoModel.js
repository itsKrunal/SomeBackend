const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isOngoing : {
    type : Boolean,
    default : false
  },
  startTime: {
    type: Date,
  },
  hours : {
    type : Number,
    default : 0
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId : {
    type: Schema.Types.ObjectId,
    required : true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Todo', todoSchema);
