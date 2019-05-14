const express=require('express')
const question=require('./controllers/questionController.js')
const router=express.Router()

router.get('/question/list',question.queryQuestions)
router.post('/question/add',question.addQuestion)
router.post('/question/editQaOptions',question.editQaOptions)
router.get('/question/queryQaInfo',question.queryQaInfo)
router.get('/question/queryQuestionOptions',question.queryQuestionOptions)

module.exports=router