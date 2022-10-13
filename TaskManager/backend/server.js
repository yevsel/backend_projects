const express = require("express")
const helmet = require("helmet")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const taskModel = require("../backend/models/taskModel")
const app = express()


//Middle wares
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"*"
}))

//Schema

//Routes
//Submit to DB
app.post("/",async(req,res)=>{
    const {data}=req.body
    try {
        if(data.length!=0){
            const response = await taskModel.create({
                data:data
            })
        }
        res.json({message:response})
    } catch (error) {
        res.json({message:error.message})        
    }
})

//Get
app.get("/",async(req,res)=>{
    
    try {
        const dataFromDB=await taskModel.find()
        res.json(dataFromDB)
    } catch (error) {
        res.json({message:error.message})
    }
})

//Delete from DB
app.delete("/:id",async(req,res)=>{
    const {id}=req.params.id
    console.log(id)
    try {
        const response=await taskModel.findByIdAndDelete(id)
        res.json({message:response})
    } catch (error) {
        res.json({message:error.message})
    }
})
//DB
mongoose.connect(process.env.DB,()=>{
    console.log("DB connection successful...")
},(err)=>{
    console.log(err.message)
})

const port = 4500
//Server Listening
app.listen(port,()=>{
    console.log(`Listening on Port ${port}...`)
})
