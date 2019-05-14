const mongoose=require('mongoose')
let Schema=mongoose.Schema
let ObjectId=Schema.Types.ObjectId

let Option=mongoose.model('option',new Schema({
  question:{
    type:ObjectId,
    ref:'Question'
  },
  content:String,
  opttype:String
}))

module.exports = Option