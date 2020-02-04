import React from "react";
import "./message.css";
import ReactEmoji from "react-emoji";

const Message = ({ message, name }) => {
  let isSentByCurrentUser = false;
  name = name.trim().toLowerCase();

  if (message.user === name) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{name}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">
          {ReactEmoji.emojify(message.text)}
        </p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">
          {ReactEmoji.emojify(message.text)}
        </p>
      </div>
      <p className="sentText pl-10">{message.user}</p>
    </div>
  );
};
export default Message;
