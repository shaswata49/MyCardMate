const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderItems:[
        {
          name: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
          },
          profit: {
            type: Number,
            // required: true,
          },
        },
    ],  

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
      createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);