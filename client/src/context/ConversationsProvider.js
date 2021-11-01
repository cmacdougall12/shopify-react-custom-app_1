import React, { useState, useContext, useCallback, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "./SocketProvider";
// import { ShopContext } from "./ShopContext";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [showConversations, setShowConversations] = useState(false);

  //change to use mongoDb
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [activeConversation, setActiveConversation] = useState(0);
  const socket = useSocket();

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

  const addMessageToConversation = useCallback((text, sender, active) => {
    const newMessage = { sender, text };
    const newConversations = [...conversations];
    newConversations[active].messages.push(newMessage);
    setConversations(newConversations);
  },[setConversations, conversations]);



  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function sendMessage(text, sender) {
    socket.emit("send-message", { text });
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
