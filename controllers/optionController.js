const Option=require('../models/option.js')
const UtilJS=require('../utils/common.js')

module.exports={
  delete:(req,res)=>{
    var optionId=req.query.optionId;
    Option.findByIdAndRemove(optionId,(err,option)=>{
      if(err){
        return res.json(UtilJS.getSendJson(false,err,null));
      }else{
        res.json(UtilJS.getSendJson(true,null,option));
      }
    })
  }
}