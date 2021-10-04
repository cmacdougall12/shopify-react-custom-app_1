import React, { useState, useContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ShopContext } from "./ShopContext";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [showConversations, setShowConversations] = useState(false);
  // const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const { product } = useContext(ShopContext);
  const closeConversations = () => setShowConversations(false);
  const openConversations = () => setShowConversations(true);

  function createConversation(userId, productId, productTitle, productImage) {
    setConversations((prevConversations) => {
      return [
        ...prevConversations,
        { userId, productId, productImage, productTitle, messages: [] },
      ];
    });
  }

  const addMessageToConversation = useCallback(
    ({ productId, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map((conversation) => {
          if (conversation[productId]) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { productId, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  function sendMessage(recipients, text) {
    // socket.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: "hard-coded-id" });
  }

  const value = {
    closeConversations,
    openConversations,
    createConversation,
    addMessageToConversation,
    sendMessage,
    showConversations,
    conversations,
  };

  console.log("product is in conversations providere", product.id);

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
