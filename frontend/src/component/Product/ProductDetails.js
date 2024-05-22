import React, { Fragment, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  // newReview,
} from "../../actions/productAction.js";

import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import OrderPopup from "./OrderPopup";
import { addItemsToCart } from "../../actions/cartAction";
import { createOrder } from "../../actions/orderAction";

const ProductDetails = ({ match, history }) => {
  const [orderName, setOrderName] = useState("");

  const handleChildData = (data) => {
    setOrderName(data);
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);
  const [isOrderPopupOpen, setOrderPopupOpen] = useState(false); // State for controlling the order popup

  const increaseQuantity = () => {
    if (product.requirement <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const checkoutHandler = () => {
    // Check if the user is authenticated
    if (isAuthenticated) {
      // User is logged in, open the order popup
      if (user && user.isApprove) {
        // User is logged in and approved, open the order popup
        setOrderPopupOpen(true);
      } else {
        // User is not approved, show a message
        alert.error("User is not Approved by Admin");
      }
    } else {
      // User is not logged in, redirect to the login page with a redirect parameter
      history.push(`/login?redirect=products`);
    }
  };

  const order = {
    orderItems: [
      {
        name: orderName,
        quantity: quantity,
        product: product._id,
        price: product.price,
        profit: product.profit,
        productname: product.name,
        address: product.description,
      },
    ],
  };

  const handleOrderSubmit = (orderName) => {
    // Handle the order submission logic here, e.g., send the order to an API
    dispatch(addItemsToCart(match.params.id, quantity, orderName))
      .then(() => {
        alert.success("Order Successful");
        dispatch(createOrder(order));
        history.push("/success");
        setOrderPopupOpen(false);
      })
      .catch((error) => {
        // Handle error if the order submission fails
        alert.error("Order Submission Failed");
      });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- Node_Project`} />
          <div className="ProductDetails">
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="mumber" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={checkoutHandler}>Order</button>
                  {/* Login logic at the time of order 10.35 */}
                </div>
              </div>

              <div className="detailsBlock-4-1">PROFIT : {product.profit}</div>

              {isAuthenticated & user.isApprove? (
                <div className="detailsBlock-4">
                  ADDRESS : {product.description}
                </div>
              ) : (
                <div className="detailsBlock-4">
                  Please login to see address
                </div>
              )}

              <div className="detailsBlock-4" style={{ marginTop: "1rem" }}>
                PRODUCT LINK :{" "}
                <a
                  href={product.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </div>

              <div className="detailsBlock-4">
                Instruction : {product.instruction}
              </div>
            </div>
          </div>

          {/* Render the OrderPopup component */}
          <OrderPopup
            isOpen={isOrderPopupOpen}
            onClose={() => setOrderPopupOpen(false)}
            onSubmit={handleOrderSubmit}
            sendDataToParent={handleChildData}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
