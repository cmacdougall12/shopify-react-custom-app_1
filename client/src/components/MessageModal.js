import React from "react";
import { Modal, ListGroup, Button, Col, Row, Container } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";

export default function MessageModal() {
  const { closeConversations, showConversations, conversations } =
    useConversations();

  console.log(conversations);

  return (
    <Modal
      fullscreen={true}
      show={showConversations}
      onHide={closeConversations}
      className="d-flex flex-column"
      size="lg"
    >
      <Modal.Header closeButton>Messages</Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col xs>
              <ListGroup variant="flush">
                {conversations.map((conversation) => (
                  <ListGroup.Item key={conversation.id}>
                    <img
                      width={100}
                      src={conversation.productImage}
                      alt="product"
                    />
                    {conversation.productTitle}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>Messages</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button> Send</Button>
      </Modal.Footer>
    </Modal>
  );
}
