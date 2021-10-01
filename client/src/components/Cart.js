import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Modal, Button, Figure, Row, Col, Container, Carousel } from "react-bootstrap";

export default function Cart() {
  const { isCartOpen, closeCart, checkout, addItemsToCheckout } =
    useContext(ShopContext);

  console.log("CHECK", checkout.lineItems);

  return (
    <Modal show={isCartOpen} onHide={closeCart}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {checkout.lineItems &&
            checkout.lineItems.map((item) => (
              <Figure
                id={item.variant.id}
                className="d-flex border rounded p-2 bg-light"
              >
                <Figure.Image src={item.variant.image.src} width={100} />
                <Col className="m-3">
                  <Figure.Caption>Title: {item.title}</Figure.Caption>
                  <Figure.Caption>Type: {item.variant.title}</Figure.Caption>
                  <Figure.Caption>Price: ${item.variant.price}</Figure.Caption>
                  <Figure.Caption>Quantity: {item.quantity}</Figure.Caption>
                </Col>
                <Col className="d-flex-inline flex-column align-items-center">
                  <Button
                    variant="success"
                    onClick={() => {
                      addItemsToCheckout(item.variant.id, 1);
                    }}
                    size="md"
                  >
                    +
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      addItemsToCheckout(item.variant.id, -1);
                    }}
                    id={item.id}
                    className="m-4"
                    size="md"
                  >
                    -
                  </Button>
                </Col>
              </Figure>
            ))}

          {!checkout && <span>Cart is empty!!</span>}
        </Row>
        <div>
          <div>Total: ${checkout.totalPrice}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeCart}>
          Continue Shopping
        </Button>
        <Button variant="primary" href={checkout.webUrl} onClick={closeCart}>
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
