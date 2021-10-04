import React from "react";
import {
  Modal,
  ListGroup,
  Button,
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
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
            <Col xs className="border h-100">
              <ListGroup variant="flush">
                {conversations.map((conversation) => (
                  <ListGroup.Item key={conversation.id}>
                    <img
                      width={100}
                      src={conversation.productImage}
                      alt="product"
                      className="m-3"
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
        <InputGroup>
          <FormControl as="textarea" placeholder="Ask question here?" />
        </InputGroup>
        <Button> Send</Button>
      </Modal.Footer>
    </Modal>
  );
}
