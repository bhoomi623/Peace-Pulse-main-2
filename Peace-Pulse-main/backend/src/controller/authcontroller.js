const usermodel=require('../models/usermodel')
const bcrypt=require('bcrypt')


exports.signup=async (req,res) => {
    console.log(req.body)
    const{username, password, email}=req.body
    try {
        if(!(username && password && email)){
            return res.status(400).json({success:false,message:"insufficient data"})

        }
        const user=await usermodel.findOne({username})
        if (user){
            return res.status(400).json({success:false,message:"this user name already exist"})
        }
        const hashedpassword =await bcrypt.hash(password,10)
        const newuser = await usermodel.create({username, password:hashedpassword, email})
        return res.status(200).cookie('user',newuser,{maxAge:24*60*60*1000,httpOnly:true, sameSite:'strict'}).json({success:true,message:"user created"})
    } catch (error) {
        return res.status(400).json({success:false,message:"server error"})
    }
}


exports.login=async(req,res)=>{
    console.log(req.body)
    const{username,password}=req.body
    try {
        if(!(username && password)){
            return res.status(400).json({success:false,message:"insufficient data"})

        }
        const user=await usermodel.findOne({username})
        console.log("user=",user)
        if(!user){
            return res.status(400).json({success:false,message:"user do not exist"})
        }
        const match=await bcrypt.compare(password,user.password)
        console.log("match=",match)
        if(!match){
            return res.status(400).json({success:false,message:"incorrect password"})
        }
        return res.status(200).cookie('user',user,{maxAge:24*60*60*1000,httpOnly:true, sameSite:'strict'}).json({success:true,message:"login successfull"})
    } catch (error) {
        return res.status(400).json({success:false,message:"server error"})
    }
}