const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    data:{
        type:String
    }
})
module.exports= mongoose.model("taskModel",taskSchema)
