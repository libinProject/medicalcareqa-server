module.exports={
  getSendJson(status,message,data){
    return {
      status:status,
      message:message,
      data:data
    }
  }
}