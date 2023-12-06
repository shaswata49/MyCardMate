import React, { Fragment, useEffect, useState } from "react";
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
import SideBar from "../Admin/Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const DeliverDetail = ( {isOpen, onClose, onSubmit,sendDataToParent,history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [orderName, setOrderName] = useState('');

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [profit, setProfit] = useState(0);
  const [description, setDescription] = useState("");
  const [productLink, setProductLink] = useState("");
  const [requirement, setRequirement] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

//   const categories = [
//     "Laptop",
//     "Footwear",
//     "Bottom",
//     "Tops",
//     "Attire",
//     "Camera",
//     "SmartPhones",
//   ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("profit", profit);
    myForm.set("description", description);
    myForm.set("productLink", productLink);
    myForm.set("requirement", requirement);

    dispatch(createProduct(myForm));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderName.trim() !== ''){
        onSubmit(orderName);
        setOrderName(''); // Clear the input field
    }
  };

  const sendData = () => {
    sendDataToParent(orderName); // Call the callback function to send data to the parent
  };

  return (
    <div className={`order-popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
          <form onSubmit={handleSubmit}>
            <h1>Deliver Details</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="date"
                placeholder="Delivery Date"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Pincode"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Tracking ID"
                required
                onChange={(e) => setProfit(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <input
                type="text"
                placeholder="Order Name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></input>
            </div>

            <div>
              <DescriptionIcon />

              <input
                type="number"
                placeholder="Quantity"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
              ></input>
            </div>

            {/* <div>
              <AccountTreeIcon />
              <select onChange={(e) => setProductLink(e.target.value)}>
                <option value="">Product Link</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div> */}

            <div>
              <StorageIcon />
              <input
                type="text"
                placeholder="Platform"
                required
                onChange={(e) => setRequirement(e.target.value)}
              />
            </div>

            

            <div id="createProductFormFile">
              <input
                type="number"
                name="Code"
                onChange={(e) => setRequirement(e.target.value)}
              />
            </div>

            {/* <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div> */}

<button type="submit" onClick={sendData}>Submit</button>
          {/* Login logic at the time of order 10.35 */}
        </form>
        <button onClick={onClose}>Close</button>
        </div>
    </div>
  );
};

export default DeliverDetail;
