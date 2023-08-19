const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"]
    },
    productLink:{
        type:String,
        required:[true,"Please Enter product Link"]
    },
    requirement:{
        type:Number,
        required:[true,"Please Enter product Quantity Required"],
        MaxLength:[4,"Stock cannot exceed 4 characters"],
        defaulst:1
    },

    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
    ],
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
})

module.exports = mongoose.model("Product",productSchema)