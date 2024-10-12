const mongoose = require("mongoose");
const user = new mongoose.Schema({
    cPassword:String,
    email:String,
    name:String,
    password:String,
    username:String
  
  
  
  
  })
  
  const User= new mongoose.model("User",user)
  module.exports=User