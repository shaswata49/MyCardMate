import {
    ADD_TO_CART,
  } from "../constants/cartConstants";
  
  export const cartReducer = (
    state = { cartItems: []},
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
        // console.log(item);
          return {
            ...state,
            cartItems: [item],
        };
  
      default:
        return state;
    }
  };