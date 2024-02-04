const Post = require("../models/Post")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const router = require("express").Router()
// get user
router.get("/:id",async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(400).json("user not found")
        }
        const {password,...others} = user._doc
        return res.status(200).json(others)
    } catch(err) {
        return res.status(500).json(err)
    }
})
// update user
router.put("/:id",async(req,res) => {
    try {
        
        if(req.body.userId !== req.params.id) {
            return res.status(400).json("not permession to execute")
        }
        if (req.body.password) {
           
            const salt = await bcrypt.genSalt(10);
           
            req.body.password = await bcrypt.hash(req.body.password, salt);
            
          }
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
        //   if(!updatedUser) {
        //     return res.status(400).json("cannot update user")
        //   }
          return res.status(200).json(updatedUser)
    } catch(err) {
        return res.status(500).json(err)
    }
})
//delete user
router.delete("/:id",async(req,res)=> {
    try {
        if(req.body.userId !== req.params.id) {
            return res.status(400).json("not permession to execute")
        }
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(400).json("user not found")
        }
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted...")

    } catch(err) {
        return res.status(500).json(err)
    }
})

module.exports = router