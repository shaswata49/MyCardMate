const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {orderItems} = req.body;

  const order = await Order.create({
    orderItems,
    user: req.user._id,
  });

  if (order) {
    order.orderItems.forEach(async (o) => {
      await updateRequirement(o.product, o.quantity);
    });
  }

  res.status(201).json({
    success: true,
    order,
  });
});


async function updateRequirement(id, quantity) {
    const product = await Product.findById(id);
  
    product.requirement -= quantity;

    if(product.requirement === 0){
        await product.deleteOne()
    }else{
        await product.save({ validateBeforeSave: false });
    }
  }

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
  
    res.status(200).json({
      success: true,
      orders,
    });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
});


// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  order.orderStatus = req.body.status;

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});