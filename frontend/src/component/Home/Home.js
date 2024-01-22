import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ImageSlider from "./ImageSlider";

const Home = () => {
  const slides = [
    {
      url: "https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Slider/s1.jpg?raw=true",
      title: "Pictur1",
    },
    {
      url: "https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Slider/s2.jpg?raw=true",
      title: "boat",
    },
    {
      url: "https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Slider/s3.jpg?raw=true",
      title: "forest",
    },
  ];

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="MyCardMate" />
          <p className="welcome">Welcome to MyCardMate</p>

          <div className="banner">
            <div className="containerStyles">
              <ImageSlider slides={slides} />
            </div>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>

          <h2 className="homeHeading">Featured Stock</h2>
          <body>
            <div class="slider">
              <div class="slide-track">
                <div class="slides">
                  <img src="https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Stock/stock1.jpg?raw=true" />
                </div>
                <div class="slides">
                  <img src="https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Stock/stock2.jpg?raw=true" />
                </div>
                <div class="slides">
                  <img src="https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Stock/stock3.jpg?raw=true" />
                </div>
                <div class="slides">
                  <img src="https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Stock/stock4.jpg?raw=true" />
                </div>
                <div class="slides">
                  <img src="https://github.com/shaswata49/Node_Project/blob/main/frontend/src/images/Stock/stock5.jpg?raw=true" />
                </div>
              </div>
            </div>
          </body>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
