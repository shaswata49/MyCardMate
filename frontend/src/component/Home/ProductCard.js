import React from "react";
import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";

// const options = {
//   isHalf : true,
//   color: "rgba(20,20,20,0.1)",
//   activeColor: "tomato",
//   size: window.innerWidth < 600 ? 20 : 25,
//   readOnly: true,
//   precision: 0.5,
//   edit:false,
//   value: product.ratings,
// }

const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images} alt={product.name} />
      <p>{product.name}</p>
      {/* <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div> */}
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;