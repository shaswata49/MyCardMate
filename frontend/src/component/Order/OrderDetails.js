import React, { Fragment, useEffect, useState } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import DeliverDetail from "./deliverDetails";


const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
  const [status, setStatus] = useState("");

  const [isOrderPopupOpen, setOrderPopupOpen] = useState(false);

  const checkoutHandler = () => {
    // // Check if the user is authenticated
    // if (isAuthenticated) {
    //   // User is logged in, open the order popup
      setOrderPopupOpen(true);
    // } else {
    //   // User is not logged in, redirect to the login page with a redirect parameter
    //   history.push(`/login?redirect=products`);
    // }
}; 

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    // dispatch(updateOrder(match.params.id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
          <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Order Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>User Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                {/* <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div> */}
                <div>
                  <p>Address:</p>
                  <span>
                    {order.orderItems && order.orderItems[0].address}
                  </span>
                </div>
              </div>
              {/* <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div> */}

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      {/* <img src={item.image} alt="Product" /> */}
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹({item.price}+{item.profit}) ={" "}
                        <b>₹{(item.price+item.profit) * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {/* {order.orderStatus === "Processing" && (
                        <option value="Processing">Processing</option>
                      )} */}

                      {order.orderStatus === "Processing" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                    onClick={checkoutHandler}
                  >
                    Process
                  </Button>
                </form>


                <DeliverDetail
                    isOpen={isOrderPopupOpen}
                    onClose={() => setOrderPopupOpen(false)}
                    // onSubmit={handleOrderSubmit}
                    // sendDataToParent={handleChildData}
                />
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
