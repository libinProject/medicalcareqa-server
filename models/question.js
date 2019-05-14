const mongoose = require('../mongodb.js')
let Schema=mongoose.Schema

let Question = mongoose.model('Question', new Schema({
  content: {
      type: String,
      required: true
  },
  type: {
      type: Number,    //1:单选 2:多选 3:问答
      required: true
  }
}));

module.exports =Question