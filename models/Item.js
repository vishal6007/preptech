const mongoose = require('mongoose')
//const { isEmail } = require('validator');
const User=require('./User');

const itemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postedBy:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    prerequisite:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default : Date.now
    }
})

const Item = mongoose.model('item',itemSchema);

module.exports = Item;