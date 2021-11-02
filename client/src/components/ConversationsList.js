import React, { useCallback } from "react";
import { Alert, ListGroup } from "react-bootstrap";

export default function ConversationsList({
  conversations,
  activeConversation,
  handleChangeConversation,
}) {
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <ListGroup variant="flush">
      {conversations > 0 &&
        conversations.map((conversation, index) => (
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
      {!conversations && (
        <Alert className="warning">"Must be logged in to view messages"</Alert>
      )}
    </ListGroup>
  );
}
