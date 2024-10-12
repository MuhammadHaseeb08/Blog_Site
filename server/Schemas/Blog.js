const mongoose = require("mongoose");


const arrSchema= new mongoose.Schema({
    comment:String,
    userName:String,
    userId:String

})
const data = new mongoose.Schema({
  
    title: String,
    imageName: String,
    desc: String,
  
    detail: String,
  
    comments: [arrSchema],
    
    likes:Number
  });
  const Blog = new mongoose.model("Blog", data);
  module.exports=Blog