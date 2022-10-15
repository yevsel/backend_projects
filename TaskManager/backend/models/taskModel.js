const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    data:{
        type:String
    },
    completed:{
        type:Boolean
    }
})
module.exports= mongoose.model("taskModel",taskSchema)
