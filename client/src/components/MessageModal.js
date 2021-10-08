import React, { useCallback, useRef } from "react";
import {
  Modal,
  ListGroup,
  Button,
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";
import OpenConversation from "./OpenConversation";

export default function MessageModal() {
  const {
    closeConversations,
    showConversations,
    conversations,
    activeConversation,
    handleChangeConversation,
    sendMessage,
  } = useConversations();

  const textRef = useRef();

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
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
      <Modal.Header closeButton onClick={() => handleChangeConversation(0)}>
        Messages
      </Modal.Header>
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

            <Col>
              <OpenConversation
                conversations={conversations}
                activeConversation={activeConversation}
              />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <InputGroup>
          <FormControl
            ref={textRef}
            as="textarea"
            placeholder="Ask question here?"
          />
        </InputGroup>
        <Button
          onClick={(e) => {
            e.preventDefault();
            sendMessage(textRef.current.value, 1);
            textRef.current.value = "";
          }}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
