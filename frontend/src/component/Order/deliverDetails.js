import React, { Fragment, useEffect, useRef, useState } from "react";
import "./deliverDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PinDropIcon from '@material-ui/icons/PinDrop';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CodeIcon from '@material-ui/icons/Code';
import SideBar from "../Admin/Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import axios from "axios";
import { updateOrder } from "../../actions/orderAction";

const DeliverDetail = ({ isOpen, onClose, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { order } = useSelector((state) => state.orderDetails);

  const deliveryDate = useRef();
  const pincode = useRef();
  const trackingID = useRef();
  const orderName = useRef();
  const orderQuantity = useRef();
  const platform = useRef();
  const code = useRef();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("OrderDetails submitted Successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const sendData = async (e) => {
    e.preventDefault();

    const deliverDetails = {
      deliveryDate: deliveryDate.current.value,
      pincode: pincode.current.value,
      trackingID: trackingID.current.value,
      orderName: orderName.current.value,
      orderQuantity: orderQuantity.current.value,
      platform: platform.current.value,
      code: code.current.value,
      isApprove: false,
    };

    await axios.post(`/api/v1/order/${order._id}/update`, deliverDetails);
    onClose();
    alert.success("OrderDetails submitted Successfully");
  };

  return (
    <div className={`order-popup ${isOpen ? "open" : ""}`}>
      <div className="deliverDetails">
        <form className="createProductForm" onSubmit={sendData}>
          <h1>Deliver Details</h1>

          <div>
            <CalendarTodayIcon />
            <input
              type="date"
              placeholder="Delivery Date"
              required
              ref={deliveryDate}
            />
          </div>
          <div>
            <PinDropIcon />
            <select placeholder="Pincode" required ref={pincode}>
              <option value="190001">190001</option>
              <option value="127021">127021</option>
              <option value="226010">226010 && 227105</option>
              <option value="472001">472001</option>
              <option value="226028">226020 && 226028</option>
            </select>
          </div>

          <div>
            <TrackChangesIcon />
            <input
              type="text"
              placeholder="Tracking ID"
              required
              ref={trackingID}
            />
          </div>

          <div>
            <DescriptionIcon />

            <input
              type="text"
              placeholder="Order Name"
              required
              ref={orderName}
            ></input>
          </div>

          <div>
            <EqualizerIcon />

            <input
              type="number"
              placeholder="Quantity"
              required
              ref={orderQuantity}
            ></input>
          </div>

          <div>
            <AddShoppingCartIcon />
            {/* <input type="text" placeholder="Platform" required ref={platform} /> */}
            <select placeholder="Platform" required ref={platform}>
              <option value="Amazon">Amazon</option>
              <option value="Flipkart">Flipkart</option>
              <option value="Samsung Store">Samsung Store</option>
              <option value="Tata Croma">Tata Croma</option>
              <option value="Mi Store">Mi Store</option>
              <option value="Oneplus Store">Oneplus Store</option>
              <option value="Realme Store">Realme Store</option>
              <option value="JioMart">JioMart</option>
              <option value="Oppo Store">Oppo Store</option>
              <option value="Vivo Store">Vivo Store</option>
              <option value="Gostor">Gostor</option>
            </select>
          </div>

          <div>
            <CodeIcon />
            <input type="number" placeholder="Code" required ref={code} />
          </div>

          <button type="submit">Submit</button>
          {/* Login logic at the time of order 10.35 */}
          <button onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default DeliverDetail;
