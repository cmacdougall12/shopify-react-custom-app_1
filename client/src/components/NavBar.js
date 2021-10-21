import Button from "@restart/ui/esm/Button";
import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";
import { useAuthentication } from "../context/LoginProvider";
import { ShopContext } from "../context/ShopContext";

export default function NavBar() {
  const { openCart } = useContext(ShopContext);
  const { openConversations } = useConversations();
  const { user, logout } = useAuthentication();

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

            {user && (
              <Nav.Item>
                <Button class="btn btn-outline-success" onClick={logout}>
                  Logout
                </Button>
              </Nav.Item>
            )}
            {!user && (
              <NavDropdown title="Account">
                <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
                <NavDropdown.Item href="/register">
                  Create Account
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={() => openConversations()}>
              <img
                className="m-1"
                width={20}
                src="/images/chat.svg"
                alt="sc-logo"
              />
              Messages
            </Nav.Link>

            <Nav.Link onClick={openCart}>
              <img
                className="m-1"
                width={20}
                src="/images/shopping-cart-solid.svg"
                alt="sc-logo"
              />
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
