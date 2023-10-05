import {
    ADD_TO_CART,
  } from "../constants/cartConstants";
  import axios from "axios";
  
  // Add to Cart
  export const addItemsToCart = (id, quantity, orderName) => async (dispatch, getState) => {
    // localStorage.clear();
    const { data } = await axios.get(`/api/v1/product/${id}`);
  

    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: orderName,
        price: data.product.price,
        // profit:data.product.profit,
        quantity,
      },
    });

  };
  