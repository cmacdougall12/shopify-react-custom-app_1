import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Card, Col, Container, Button, Spinner } from "react-bootstrap";
import Cart from "../components/Cart";
import MessageModal from "../components/MessageModal";
import { useConversations } from "../context/ConversationsProvider";

export default function ProductPage() {
  let { id } = useParams();
  const { openConversations, createConversation } = useConversations();

  const { fetchProductWithId, product, addItemsToCheckout, openCart } =
    useContext(ShopContext);

  useEffect(() => {
    fetchProductWithId(id);
  }, []);

  if (!product || !product.title)
    return (
      <Container fluid className="d-flex justify-content-center  mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );

  return (
    <Container fluid className="d-flex justify-content-center mt-5">
      <Col xs={10} md={5}>
        <Card>
          <Card.Img src={product.images[0].src} />
          <Card.Title>{product.title}</Card.Title>
          <Card.Subtitle>${product.variants[0].price}</Card.Subtitle>
          <Card.Text>{product.description}</Card.Text>
          <Button
            onClick={() => {
              addItemsToCheckout(product.variants[0].id, 1);
              openCart();
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="light"
            onClick={() => {
              openConversations();
              createConversation(
                1,
                product.id,
                product.title,
                product.images[0].src,
              );
            }}
          >
            <img
              src="/images/chat.svg"
              width={30}
              alt="chat-icon"
              className="m-2"
            />
            Have a question?
          </Button>
        </Card>
      </Col>
      <Cart />
      <MessageModal />
    </Container>
  );
}
