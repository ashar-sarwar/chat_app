import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";
import InfoBar from "../infoBar/infobar";
import Input from "../Input/input";
import Messages from "../messages/messages";
import TextContainer from "../TextContainer/textContainer";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const endPoint = `localhost:4000`;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log(location.search); // gives the link parameters
    socket = io(endPoint);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [endPoint, location.search]);

  // useEffect(() => {
  //   socket.on("message", message => {
  //     setMessages([...messages, message]);
  //   });
  // }, [messages]);

  // const sendMessage = e => {
  //   e.preventDefault();

  //   if (message) {
  //     socket.emit("sendMessage", message, () => setMessage(""));
  //   }
  // };

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();
console.log(message)
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages name={name} messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};
export default Chat;
