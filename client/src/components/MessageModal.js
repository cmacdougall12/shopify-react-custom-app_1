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

  const messages = (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {conversations[activeConversation].messages.map((message, index) => (
            <div
              className={
                "my-1 d-flex flex-column align-self-end align-items-end"
              }
              key={index}
            >
              <div className={"rounded px-2 py-1 bg-primary text-white"}>
                {message.text}
              </div>
              <div className="text-muted small text-right">
                {message.sender}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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

            <Col>{messages}</Col>
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
