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

  // const formattedConversations = conversations.map((conversation, index) => {
  // const products = conversation.productId
  // const recipients = conversation.productId.map((recipient) => {
  //   const contact = contacts.find((contact) => {
  //     return contact.id === recipient;
  //   });

  //   const name = (contact && contact.name) || recipient;
  //   return { id: recipient, name };
  // });

  // const messages = conversation.messages.map((message) => {
  //   const contact = contacts.find((contact) => {
  //     return contact.id === message.sender;
  //   });

  //   const name = (contact && contact.name) || message.sender;
  //   const fromMe = id === message.sender;
  //   return { ...message, senderName: name, fromMe };
  // });

  // const selected = index === selectedConversationIndex;
  // return { ...conversation, messages, recipients, selected };
  // });

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

// function arrayEquality(a, b) {
//   if (a.length !== b.length) {
//     return false;
//   }

//   a.sort();
//   b.sort();

//   return a.every((element, index) => {
//     return element === b[index];
//   });
// }
