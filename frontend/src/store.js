import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import{ productDetailsReducer, productReducer } from "./reducers/productReducer"
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer } from "./reducers/orderReducer";

// import {
//   allUsersReducer,
//   forgotPasswordReducer,
//   profileReducer,
//   userDetailsReducer,
//   userReducer,
// } from "./reducers/userReducer";

// import { cartReducer } from "./reducers/cartReducer";
// import {
//   allOrdersReducer,
//   myOrdersReducer,
//   newOrderReducer,
//   orderDetailsReducer,
//   orderReducer,
// } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  // orderDetails: orderDetailsReducer,
  // newReview: newReviewReducer,
  // newProduct: newProductReducer,
  // product: productReducer,
  // allOrders: allOrdersReducer,
  // order: orderReducer,
  // allUsers: allUsersReducer,
  // userDetails: userDetailsReducer,
  // productReviews: productReviewsReducer,
  // review: reviewReducer,
});

let initialState = {
  cart: {
    // cartItems: localStorage.getItem("cartItems")
    //   ? JSON.parse(localStorage.getItem("cartItems"))
    //   : [],
    // shippingInfo: localStorage.getItem("shippingInfo")
    //   ? JSON.parse(localStorage.getItem("shippingInfo"))
    //   : {},

    cartItems:[]
  },
};

const middleware = [thunk];

// debugger
const store = configureStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
