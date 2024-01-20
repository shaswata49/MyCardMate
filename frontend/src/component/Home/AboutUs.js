import React, { Fragment } from "react";
import "./AboutUs.css";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

import MetaData from "../layout/MetaData";

const AboutUs = ({}) => {
  const { loading } = useSelector((state) => state.products);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ABOUTUS -- Node_Project" />
          <div className="about-us-container">
            <h2>Welcome to MyCardMate Mobile Booking!</h2>
            <p>
              At MyCardMate, we provide a platform for Mobile Booking, allowing
              you to order mobile phones through various websites and have them
              delivered to your specified address.
            </p>

            <h3>How to Start Mobile Booking:</h3>
            <p>
              To begin mobile booking, you need to first create accounts on
              popular e-commerce websites like Amazon, Flipkart, OnePlus store,
              and others. Additionally, having a credit card from leading banks
              such as SBI, HDFC, ICICI, AXIS can be helpful. Some opportunities
              also offer cash on delivery orders where you can earn without
              upfront investment.
            </p>

            <h3>Earnings and Trustworthiness:</h3>
            <p>
              Earnings are directly linked to the quantity of phones you order.
              The more phones you order, the higher your potential earnings.
              It's not a fixed amount; it depends on your order quantity.
            </p>

            <h3>
              How can you determine whether a person is trustworthy or not?
            </h3>
            <p>
              Nowadays, there are numerous fake Telegram channels and WhatsApp
              groups that promise higher commissions, even exceeding the market
              rates. Sometimes, individuals get lured by these exaggerated
              returns. Therefore, it's essential not to be driven by greed for a
              slightly higher commission and risk losing your capital. Instead,
              prioritize booking with someone you know is genuine, even if it
              might result in a slight delay in payment, as your
              capital will be secure.
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AboutUs;
