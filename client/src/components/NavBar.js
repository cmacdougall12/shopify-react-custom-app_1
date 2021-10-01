import React, { useContext, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { ShopContext } from "../context/ShopContext";

export default function NavBar() {
  const { openCart } = useContext(ShopContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">
          <img
            className="m-1"
            width={30}
            src="/images/logo.svg"
            alt="sc-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/home">Collections</Nav.Link>
            <Nav.Link href="#account">Account</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link>
              <img
                className="p-0.5"
                width={30}
                src="/images/chat.svg"
                alt="sc-logo"
              />
            </Nav.Link>

            <Nav.Link onClick={openCart}>
              <img
                className="p-0.5"
                width={30}
                src="/images/shopping-cart-solid.svg"
                alt="sc-logo"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
