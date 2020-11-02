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
  // Estado
  const [show, setShow] = useState(false);

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
            <Nav.Link id="text" href="/about">
              About
            </Nav.Link>
            <Nav.Link id="text" href="/contact-us">
              Contact us
            </Nav.Link>
          </Nav>
          <Nav className="AddKitchen">
            <Nav.Link id="text" href="/signup" style={{ color: "#d73d36" }}>
              Sign up
            </Nav.Link>
            <Nav.Link id="text" href="/login" style={{ color: "#d73d36" }}>
              log in
            </Nav.Link>
            <Button
              className="button"
              type="submit"
              href="/add-kitchen"
              onClick={() => setShow(true)}
            >
              + Add Your Kitchen
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
