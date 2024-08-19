//import statements

const express=require("express")
const cors=require("cors")
const cookieparser=require("cookie-parser")
const { connectdatabase } = require("./src/utils/database")
const authroutes = require("./src/routes/authroute")
const{log}=require('./src/utils/log')

//make express app
const app=express()


// connect database
connectdatabase() 

// use middlewares

app.use(express.json())
app.use(express.json(express.urlencoded({extended:true})))
app.use(cors())
app.use(log)
app.use(cookieparser())

//use routes
app.use('/auth',authroutes)

//make default endpoint
app.get('/',(req,res)=>{return res.status(200).json({success:true,message:'all ok'})})
//listen to app
const port=8080
app.listen(port, () => {
    console.log(`server is running at port=${port}`)
})

