const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const topic = new mongoose.Schema({
  name : {
  type : String
  }
}, {
  timestamps: true
});

const questionSchema = new mongoose.Schema({
    problem : {
        type: String
    },
    linkto: {
    type : String
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required : [true,'Topic must be specified']
      },
    approved:{
      type: Boolean,
      default : false
    }
});


const Question = mongoose.model('Question', questionSchema);
const Topic = mongoose.model('Topic',topic);
module.exports = {
Topic,
Question
};
