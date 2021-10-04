import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";

export default function MessageModal() {
  const { closeConversations, showConversations } = useConversations();

  return (
    <Modal show={showConversations} onHide={closeConversations}>
      <div>Messages</div>
    </Modal>
  );
}
