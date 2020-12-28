import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";

// Images
import cheffyapp from "../../images/cheffyapp.png";

// Icons
import { FaApple } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.scss";

const PaymentSuccess: React.FC = () => {
  return (
    <div id="page-success">
      <header>
        <Link to="/">
          <FiArrowLeft size={20} />
          Back to home
        </Link>
      </header>
      <div className="body">
        <img src={cheffyapp} />
        <div className="content-text">
          <h1 className="title">Get The App Now !</h1>
          <h1 className="text">
            To be able to track the status of your order, you must download our
            app.
          </h1>
          <div>
            <a
              className="button"
              href="https://apps.apple.com/us/app/cheffy-driver/id1483317834"
            >
              <FaApple size={45} />
              <p className="text-link">
                <small>Download On</small>
                <br /> Apple Store
              </p>
            </a>
            <a
              className="button"
              href="https://play.google.com/store/apps/details?id=com.app.cheffypartner"
            >
              <IoLogoAndroid size={45} />
              <p className="text-link">
                <small>Download On</small>
                <br /> Google Play
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
