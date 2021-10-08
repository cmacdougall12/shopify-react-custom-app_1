import React from "react";

export default function openConversation({
  conversations,
  activeConversation,
}) {
  return (
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
}
