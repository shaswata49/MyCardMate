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
          },
          price:{
            type: Number,
          },
          productname:{
            type: String,
          },
          address:{
            type: String,
          },
        },
    ], 

    deliverDetails:{

      deliveryDate:{
        type: Date
      },
      pincode:{
        type: String
      },
      trackingID:{
        type: String
      },
      orderName:{
        type: String
      },
      orderQuantity:{
        type: Number,
        default: 1
      },
      platform:{
        type: String
      },
      code:{
        type: Number
      },
      isApprove:{
        type: Boolean,
        default: false
      },

    },

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