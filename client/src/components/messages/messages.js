import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./message/message";
import "./messages.css";

const Messages = ({messages,name}) => (
  <ScrollToBottom className="messages">
    {messages.map(message => (
      <div>
        <Message message={message} name={name}/>
      </div>
    ))}
  </ScrollToBottom>
)

export default Messages;
