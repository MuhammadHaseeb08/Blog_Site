const mongoose = require("mongoose");


let connect=()=>{
    mongoose
    .connect("mongodb://127.0.0.1:27017/BlogsData", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("im mongo");
    })
    .catch((e) => {
      e
    });
}

module.exports=connect
