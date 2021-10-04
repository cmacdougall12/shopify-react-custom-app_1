import React, { useState, useContext } from "react";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [showConversations, setShowConversations] = useState(false);

  const closeConversations = () => setShowConversations(false);
  const openConversations = () => setShowConversations(true);

  const value = {
    closeConversations,
    openConversations,
    showConversations,
  };

  console.log(showConversations);

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
