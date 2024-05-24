import React, { Fragment } from "react";
import "./Contact.css";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Container, Row, Col } from "react-bootstrap";

import MetaData from "../layout/MetaData";

const Contact = ({}) => {
  const { loading } = useSelector((state) => state.products);
  const contactConfig = {
    YOUR_EMAIL: "mycardmate@gmail.com",
    YOUR_FONE: "+918127657200",
    description:
      "Unlock new opportunities on-the-go! Book mobile devices hassle-free and earn rewards with every transaction. Your credit card is in safe hands – trust us for secure and reliable mobile bookings.",
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ContactUS -- Node_Project" />
          <Container>
            <div className="contact-us-container">
              <Row className="mb-5 mt-3">
                <Col lg="8">
                  <h1 className="display-4 mb-4">Contact Us</h1>
                  <hr className="t_border my-4 ml-0 text-left" />
                </Col>
              </Row>
              <Row className="sec_sp">
                <Col lg="5" className="mb-5">
                  <h3 className="color_sec py-4">Get in touch</h3>
                  <address>
                    <strong>Email:</strong>{" "}
                    <a className="email" href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                      {contactConfig.YOUR_EMAIL}
                    </a>
                    <br />
                    <br />
                    {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                      <p className="address-text">
                        <strong>Phone:</strong> {contactConfig.YOUR_FONE}
                      </p>
                    ) : (
                      ""
                    )}
                  </address>
                  <p className="address-text">{contactConfig.description}</p>
                </Col>
                <Col lg="7" className="d-flex align-items-center">
                  <form className="contact__form w-100">
                    <Row>
                      <Col lg="6" className="form-group">
                        <input
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Name"
                          type="text"
                          required
                        />
                      </Col>
                      <Col lg="6" className="form-group">
                        <input
                          className="form-control rounded-0"
                          id="email"
                          name="email"
                          placeholder="Email"
                          type="email"
                          required
                        />
                      </Col>
                    </Row>
                    <textarea
                      className="form-control rounded-0"
                      id="message"
                      name="message"
                      placeholder="Message"
                      rows="5"
                      required
                    ></textarea>
                    <br />
                    <Row>
                      <Col lg="12" className="form-group">
                        <button className="btn ac_btn" type="submit">
                          Send
                        </button>
                      </Col>
                    </Row>
                  </form>
                </Col>
              </Row>
            </div>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Contact;
