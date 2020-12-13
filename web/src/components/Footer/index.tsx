import React from "react";

//Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

//Icons
import { IoLogoFacebook } from "react-icons/io";
import { ImTwitter } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

//Types
import { Icon } from "../../services/types";

import "./styles.scss";

const Footer: React.FC = () => {
  //Icones com links
  const icons: Icon[] = [
    { icon: IoLogoFacebook, link: "https://www.facebook.com/OluhaIC/" },
    {
      icon: ImTwitter,
      link: "https://twitter.com/Cheffy74421153",
    },
    { icon: FaInstagram, link: "https://www.instagram.com/cheffy.partners/" },
    { icon: AiOutlineMail, link: "mailto:chaejimmy1@gmail.com" },
  ];

  return (
    <Container fluid id="footer">
      <div className="footer-center">
        {icons.map((Icon) => (
          <div className="icons">
            <a href={Icon.link} target="__blank">
              <Icon.icon size={26} color={"#777777"} className="icon" />
            </a>
          </div>
        ))}
      </div>
      <div className="footer-end">
        Copyright &copy; {new Date().getFullYear()},{" "}
        <a href="https://oluha.com/" target="__blank" className="link">
          Oluha Company.
        </a>{" "}
        All rights reserved.
      </div>
    </Container>
  );
};

export default Footer;
