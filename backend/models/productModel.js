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
    type: String,
    required: true,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiSUNfqMQvCLa4GnHS9dZs3cPRt1z3xcP7p-fHsSQ&s",
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
