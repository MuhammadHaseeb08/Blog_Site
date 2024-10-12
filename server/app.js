// const { logDOM } = require("@testing-library/react");
const express = require("express");
const mongoose = require("mongoose");
const conection = require("./dbConn")
const User = require("./Schemas/User")
const Blog = require("./Schemas/Blog")
const axios = require("axios")
const jwt=require("jsonwebtoken")
const app = express();
app.use(express.json());
const multer = require("multer");
const fs = require("fs");
const {uploadToCloudinary}=require("./uploadCloudinary")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = "./public/Images";

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

app.post("/seesion", function (req, res) {

  jwt.verify(req.body.SomeToken, "thisismylovecountry", async function (err, data) {
    if (data) {
      let user = await User.findById(data.id);
      res.json(user)
    }
  })
})
app.get("/get", async (req, res) => {
  let founded = await Blog.find()
  // console.log(founded);
  res.json({ founded, success: true })
})
app.put("/cmt", async (req, res) => {
  // let id = req.params.id
  console.log(req.body);
  let founded = await Blog.findByIdAndUpdate(req.body.id, { $push: { comments: req.body.data } })
 
  if (founded) {
    let allBlogs= await Blog.find()

    
    res.json({ success: true,allBlogs })
  }else{
    res.json({
      success:false,
      allBlogs:[]
    })
  }
})
app.post("/createUser", async (req, res) => {
  // console.log(req.body.data);
  // User.insert(req.body.data)
  let founded = new User(req.body.data)
  await founded.save()
  res.json({ success: true })
})

app.post("/checkUser", async (req, res) => {
  // console.log(req.body);
  let founded = await User.findOne({ $and: [{ username: req.body.data.username }, { password: req.body.data.password }] })
  // console.log(founded);
  if (founded) {
    // .....jwtoken\
    jwt.sign({ id: founded._id }, "thisismylovecountry", { expiresIn: "7d" }, function (err, meratoken) {
      res.json({ message: "User Found", data: founded, meratoken, success: true });
    });
  } else {
    res.json({ message: "User not Found", success: false });
  }
})
app.get("/cryp", (req, res) => {
  // console.log(data);
  let geting = async () => {
    try {
      let data = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en")

      let confinded = data.data.map((item) => {
        return {
          name: item.name,
          symb: item.symbol,
          logo: item.image,
          price: item.current_price,
          prcnt: item.price_change_percentage_24h
        }
      })
      res.json({ success: true, data: confinded })
      console.log(confinded);
    } catch (error) {
      console.log(error);
    }
  }
  geting()


})

app.post("/createBlog",upload.fields([
  { name: "imageName", maxCount: 1 },
  
]), async (req, res) => {

  let imageName = await uploadToCloudinary(req.files.imageName[0].path);
  let blog={
    ...req.body,
    desc:"",
    likes:"",

    imageName
  }
  let founded = new Blog(blog)
  await founded.save()
  res.json({ success: true })
})

app.listen(4000, () => {
  console.log("Server is working continously");
});
conection()