import React, { useState } from "react";

//Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

//Images
import logo from "../../images/logo.jpg";

import "./styles.scss";

const NavBar: React.FC = () => {
  //Estados
  const [show, setShow] = useState(false);

  //Mudança de scroll para cima e para baixo
  const scrollToNextPage = () => window.scrollTo(0, 1000);
  const scrollToPreviousPage = () => window.scrollTo(0, 0);

  return (
    <>
      <Navbar id="navbar" expand="xl">
        <Navbar.Brand className="logo" href="/">
          <img src={logo} alt="Cheffy" />
        </Navbar.Brand>
        <Form inline>
          <FormControl
            className="search"
            type="text"
            placeholder="Search Kitchen here..."
          />
        </Form>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link style={{ fontSize: "14px" }}>About</Nav.Link>
            <Nav.Link style={{ fontSize: "14px" }}>Contact us</Nav.Link>
          </Nav>
          <Nav className="AddKitchen">
            <Nav.Link style={{ color: "#d73d36", fontSize: "14px" }}>
              Sign up
            </Nav.Link>
            <Nav.Link style={{ color: "#d73d36", fontSize: "14px" }}>
              log in
            </Nav.Link>
            <Button className="button" variant="outline-secondary">
              + Add Your Kitchen
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
