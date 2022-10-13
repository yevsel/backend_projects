const express = require("express")
const helmet = require("helmet")
const mongoose = require("mongoose")
const app = express()

//Middle wares
app.use(helmet())



const port = 4500
//Server Listening
app.listen(port,()=>{
    console.log(`Listening on Port ${port}...`)
})
