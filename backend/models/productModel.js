const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Address"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
  },
  productLink: {
    type: String,
    required: [true, "Please Enter product Link"],
  },
  requirement: {
    type: Number,
    required: [true, "Please Enter product Quantity Required"],
    MaxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  images: {
    type: Array,
    required: true,
    default:[
      "https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Product/IMG-20230926-WA0000.jpg?raw=true",
      "https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Product/IMG-20230926-WA0001.jpg?raw=true",
      "https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Product/IMG-20230926-WA0002.jpg?raw=true"
    ]
  },
  instruction:{
    type: String,
  },
  
  isAvail: {
    type: Boolean,
    default: true,
  },

  profit: {
    type: Number,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
