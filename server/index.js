const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose  = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const multer = require("multer");
const path = require("path");
const cors = require("cors")
dotenv.config()//load env file
app.use(express.json())//to enable to send response json from express
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "/images")));
const connect = async()=> {
    try{
       await mongoose.connect(process.env.MONGO_URL)
       console.log("connected to database")
    } catch(err) {
        console.log(err)
    }
}
connect()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    return res.status(200).json("File has been uploaded");
  });
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories", categoryRoute)
app.listen(process.env.PORT,()=> {
    console.log(`the server running in port ${process.env.PORT}`)
})