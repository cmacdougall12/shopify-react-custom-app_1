import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Modal, Button, Figure, Row, Col, Alert } from "react-bootstrap";

export default function Cart() {
  const { isCartOpen, closeCart, checkout, addItemsToCheckout, removeItem } =
    useContext(ShopContext);

  return (
    <Modal show={isCartOpen} onHide={closeCart}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {(!checkout.lineItems || checkout.lineItems.length === 0) && (
            <Alert variant="danger" className="text-center">
              Cart is empty!!
            </Alert>
          )}
          {checkout.lineItems &&
            checkout.lineItems.map((item) => (
              <Figure
                id={item.variant.id}
                className="d-flex border rounded bg-light"
              >
                <Figure.Image src={item.variant.image.src} width={100} />
                <Col className="m-3">
                  <Figure.Caption>Title: {item.title}</Figure.Caption>
                  <Figure.Caption>Type: {item.variant.title}</Figure.Caption>
                  <Figure.Caption>Price: ${item.variant.price}</Figure.Caption>
                  <Figure.Caption>Quantity: {item.quantity}</Figure.Caption>
                </Col>
                <Col className="d-flex align-items-center">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      addItemsToCheckout(item.variant.id, 1);
                    }}
                    size="md"
                  >
                    +
                  </Button>
                  <Button
                    variant="secondary"
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

                <Col className="d-flex justify-content-end">
                  <Button
                    onClick={() => {
                      removeItem(item.id);
                    }}
                    variant="dark"
                    size="sm"
                  >
                    Remove
                  </Button>
                </Col>
              </Figure>
            ))}
        </Row>
        <div>
          <div>Total: ${checkout.totalPrice}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeCart}>
          Continue Shopping
        </Button>
        <Button
          disabled={!checkout.lineItems || checkout.lineItems.length === 0}
          variant="primary"
          href={checkout.webUrl}
          onClick={closeCart}
        >
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
