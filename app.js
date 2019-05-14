const express=require('express')
const bodyParser=require('body-parser')
const router=require('./router.js')
const app=express()

// 注意中间件注入顺序
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(router)

app.listen(8999,'0.0.0.0',()=>{
  console.log('mediacare-qa-server running at http://127.0.0.1:8999')
})