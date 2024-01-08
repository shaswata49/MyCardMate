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

  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

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
          <MetaData title="Node_Project" />

          <p className="welcome">Welcome to MyCardMate</p>

          <div className="banner">
            <div style={containerStyles}>
              <ImageSlider slides={slides} />
            </div>

            {/* <a href="#container">
              <button>
                Scroll
                <CgMouse />
              </button>
            </a> */}
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>

          <body>
            <div class="slider">
              <div class="slide-track">
                <div class="slide">
                  <img src="https://p.potaufeu.asahi.com/1831-p/picture/27695628/89644a996fdd0cfc9e06398c64320fbe.jpg" />
                </div>
                <div class="slide">
                  <img src="https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg" />
                </div>
                <div class="slide">
                  <img src="https://p.potaufeu.asahi.com/1831-p/picture/27695628/89644a996fdd0cfc9e06398c64320fbe.jpg" />
                </div>
                <div class="slide">
                  <img src="https://p.potaufeu.asahi.com/1831-p/picture/27695628/89644a996fdd0cfc9e06398c64320fbe.jpg" />
                </div>
                <div class="slide">
                  <img src="https://p.potaufeu.asahi.com/1831-p/picture/27695628/89644a996fdd0cfc9e06398c64320fbe.jpg" />
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
