import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getProductDetails,
    // newReview,
  } from "../../actions/productAction.js";

const ProductDetails = ({match}) => {

    const dispatch = useDispatch();
    // const alert = useAlert();

    const {product,loading,error} = useSelector(
        (state)=>state.productDetails
        );

    useEffect(() => {
        // if (error) {
        //   alert.error(error);
        //   dispatch(clearErrors());
        // }
    
        // if (reviewError) {
        //   alert.error(reviewError);
        //   dispatch(clearErrors());
        // }
    
        // if (success) {
        //   alert.success("Review Submitted Successfully");
        //   dispatch({ type: NEW_REVIEW_RESET });
        // }
        dispatch(getProductDetails(match.params.id));
      }, [dispatch, match.params.id, error, alert]);
    //   [reviewError, success]
  
    return (
        <Fragment>
             <div className="ProductDetails">
                <div>
                    <Carousel>
                        {product.images &&
                            product.images.map((item, i) => (
                        <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                        />
                    ))}
                    </Carousel>
                </div>
             </div>
        </Fragment>
    );
};

export default ProductDetails;