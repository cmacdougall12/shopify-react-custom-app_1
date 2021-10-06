import React, { useCallback } from "react";
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
  const {
    closeConversations,
    showConversations,
    conversations,
    activeConversation,
    handleChangeConversation,
  } = useConversations();

  console.log("activeConversation", activeConversation);

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

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
                {conversations.map((conversation, index) => (
                  <ListGroup.Item
                    key={conversation.id}
                    active={index === activeConversation}
                    ref={index === activeConversation ? setRef : null}
                    onClick={() => handleChangeConversation(index)}
                  >
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
