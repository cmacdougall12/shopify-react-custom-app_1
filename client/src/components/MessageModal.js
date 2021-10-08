import React, { useRef } from "react";
import {
  Modal,
  Button,
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";
import ConversationsList from "./ConversationsList";
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
              <ConversationsList
                conversations={conversations}
                activeConversation={activeConversation}
                handleChangeConversation={handleChangeConversation}
              />
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
