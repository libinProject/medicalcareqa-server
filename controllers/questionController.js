const Question=require('../models/question.js')
const Option=require('../models/option.js')
const UtilJS=require('../utils/common.js')
const async=require('async')
const _=require('underscore')

module.exports={
  queryQuestions:(req,res)=>{
    // 搜索条件
    const keywords=req.query.keywords
    const reg = new RegExp(keywords, 'i')
    Question.find(
      {
        $or : [ //多条件，数组
            {content : {$regex : reg}}
          ]
        }
      )
      .select('content type')
      .exec(function (err, questions) {
          if (err) {
              return res.json(UtilJS.getSendJson(false,err,null));
          }
          res.json(UtilJS.getSendJson(true,null,questions));
      });
  },
  queryQuestionOptions:(req,res)=>{
    const keywords=req.query.keywords
    const reg = new RegExp(keywords, 'i')
    Question.find(
      {
        $or : [ //多条件，数组
            {content : {$regex : reg}}
          ]
        }
      )
      .select('content type')
      .exec((err, questions)=> {
        async.map(questions,(question,callback)=>{
          Option.find({question:question})
            .select("content opttype")
            .sort({opttype:1})
            .exec((err,options)=>{
              let retObj=question.toObject()
              retObj.options=options
              callback(err,retObj)
            })
        },(err,result)=>{
          if(err){
            return res.json(UtilJS.getSendJson(false,err,null));
          }
          res.json(UtilJS.getSendJson(true,null,result));
        })
      });  
  },
  addQuestion:(req,res)=>{
    let questionModel=new Question(req.body)
    questionModel.save((err,question)=>{
        if(err){
            return res.json(UtilJS.getSendJson(false,err,null));
        }
        res.json(UtilJS.getSendJson(true,null,question._id));
    })
  },
  editQaOptions:(req,res)=>{
    let question=req.body.question
    let options=req.body.options
    async.series([
      (callback)=>{
        Question.findById(question._id)
          .exec((err,_question)=>{
            let newQuestion=_.extend(_question,question)
            newQuestion.save((err,question)=>{
              callback(err,question)
            })
          })
      },
      (callback)=>{
        async.each(options,(option,callback)=>{
          if(option._id){
            Option.findOneAndUpdate({
              _id:option._id,
              question:question._id
            },{
              $set:{
                content:option.content,
                opttype:option.opttype,
              }
            },err=>{
              callback(err)
            })
          }else{
            let newOption=new Option({
              content:option.content,
              opttype:option.opttype,
              question:question._id
            })
            newOption.save(err=>{
              callback(err)
            })
          }
        },err=>{
          callback(err)
        })
      }
    ],(err,result)=>{
      if(err){
        return res.json(UtilJS.getSendJson(false,err,null));
      }else{
        res.json(UtilJS.getSendJson(true,null,result));
      }
    })
  },
  queryQaInfo:(req,res)=>{
    let questionId=req.query.qId
    Question.findById(questionId)
      .select("content type")
      .exec((err,question)=>{
        if(err){
          return res.json(UtilJS.getSendJson(false,err,null));
        }
        if(!question){
          return res.json(UtilJS.getSendJson(false,'Question not Exist',null));
        }

        Option.find({question:question})
          .select("content opttype")
          .sort({opttype:1})
          .exec((err,options)=>{
            let retObj={
              question:question,
              options:options
            }
            res.json(UtilJS.getSendJson(true,null,retObj));
          })
      })
  }
}