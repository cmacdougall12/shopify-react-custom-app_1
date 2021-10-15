import React, { useState, useContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
// import { ShopContext } from "./ShopContext";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [showConversations, setShowConversations] = useState(false);
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [activeConversation, setActiveConversation] = useState(0);

  const closeConversations = () => setShowConversations(false);
  const openConversations = () => setShowConversations(true);

  function findExistingConversation(
    userId,
    productId,
    productTitle,
    productImage
  ) {
    let existing = false;
    const userIdConversations = conversations.filter(
      (conversation) => conversation.userId === userId
    );
    existing = userIdConversations.find((conversation, index) => {
      if (conversation.productId === productId) {
        setActiveConversation(index);
        return true;
      }
    });

    if (!existing) {
      createConversation(userId, productId, productTitle, productImage);
      setActiveConversation(conversations.length);
    }
  }

  function createConversation(userId, productId, productTitle, productImage) {
    setConversations((prevConversations) => {
      return [
        ...prevConversations,
        { userId, productId, productImage, productTitle, messages: [] },
      ];
    });
  }

  function handleChangeConversation(index) {
    setActiveConversation(index);
  }

  const addMessageToConversation = (text, sender, active) => {
    const newMessage = { sender, text };
    const newConversations = [...conversations];
    newConversations[active].messages.push(newMessage);
    setConversations(newConversations);
  };

  function sendMessage(text, sender) {
    // socket.emit("send-message", { recipients, text });
    addMessageToConversation(text, sender, activeConversation);
  }


  const value = {
    closeConversations,
    openConversations,
    createConversation,
    addMessageToConversation,
    findExistingConversation,
    handleChangeConversation,
    sendMessage,
    showConversations,
    conversations,
    activeConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

