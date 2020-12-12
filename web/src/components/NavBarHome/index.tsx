import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// Material UI
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core/styles";

//Icons
import { BiMenu } from "react-icons/bi";

// Images
import logo from "../../images/logo.jpg";

import "./styles.scss";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const NavBarHome: React.FC<Props> = (props: Props) => {
  const { window } = props;
  const theme = useTheme();

  // States
  const [show, setShow] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div id="drawer">
      <div className="drawer-menu">
        <p>Menu</p>
        <Link className="text3" to="/">
          Home
        </Link>
        <Link className="text3" to="/about">
          About
        </Link>
        <Link className="text3" to="/contact-us">
          Contact us
        </Link>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Navbar id="navbarhome" expand="xl">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
        <Nav className="content1" onMouseOut={() => setShow(false)}>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <BiMenu />
            </IconButton>
          </Hidden>
          <Navbar.Brand className="logo" href="/">
            <img src={logo} alt="Cheffy" />
          </Navbar.Brand>
          <Hidden smDown implementation="css">
            <div className="texts">
              <Nav.Link className="text1" href="/about">
                About
              </Nav.Link>
              <Nav.Link className="text1" href="/contact-us">
                Contact us
              </Nav.Link>
            </div>
          </Hidden>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBarHome;
