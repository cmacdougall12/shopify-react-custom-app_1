import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Figure, Row, Col, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../components/Cart";
import MessageModal from "../components/MessageModal";
import { useConversations } from "../context/ConversationsProvider";

export default function HomePage() {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, []);

  if (!products)
    return (
      <Container fluid className="d-flex justify-content-center  mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );

  return (
    <Container className="mt-5">
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={6} md={4}>
            <Link to={`/product/${product.id}`}>
              <Figure>
                <Figure.Image src={product.images[0].src} thumbnail />
                <Figure.Caption>{product.title}</Figure.Caption>
                <Figure.Caption>{product.variants[0].price}</Figure.Caption>
              </Figure>
            </Link>
          </Col>
        ))}
      </Row>
      <Cart />
      <MessageModal />
    </Container>
  );
}
