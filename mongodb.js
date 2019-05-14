const mongoose=require('mongoose')
const MG_DB_URL="mongodb://127.0.0.1:27017/medicalcareqa"

mongoose.connect(MG_DB_URL,{ useNewUrlParser: true })

mongoose.connection.on('connected',()=>{
  console.log('MongoDB connect success at:'+MG_DB_URL)
})

mongoose.connection.on('error',()=>{
  console.log('MongoDB connected error:'+error)
})

mongoose.connection.on('disconnected',()=>{
  console.log('MongoDB disconnected ')
})

module.exports = mongoose