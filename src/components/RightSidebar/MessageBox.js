import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import LeftChatBubble from "./LeftChatBubble";
import RightChatBubble from "./RightChatBubble";
import MessageInput from "./MessageInput";
import { addNewMessage } from "../../actions/contact";
import ProfileHeader from "../LeftSidebar/ProfileHeader";

function MessageBox(props) {
  const [chat, setChat] = useState([]);
  const [length, setLength] = useState();
  const dispatch = useDispatch();
  const bottomRef = useRef(null); // Create a ref to the bottom of the chat list

  useEffect(() => {
    setChat(props.user.chatlog);
    setLength(props.user.chatlog.length);
  }, [props]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll into view when chat updates
  }, [chat]);

  const updateMessages = (message) => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const timestamp = `${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

    const object = {
      text: message,
      timestamp: timestamp,
      sender: "me",
      message_id: length + 1,
    };
    dispatch(addNewMessage(object, props.user.id));
    setLength(object.message_id);
    setChat([...chat, object]);
  };

  return (
    <>
      <div className="message-box">
        <div className="message-box-header" xs={6} sm={7} md={8} lg={7} xl={8}>
          <ProfileHeader user={props.user} />
        </div>
        {chat.length === 0 && (
          <p className="no-message-alert">NO MESSAGES FOUND</p>
        )}
        {chat.length > 0 && (
          <div className="messages-section">
            {chat.map((m, index) =>
              m.sender === "me" ? (
                <RightChatBubble
                  message={m}
                  key={index}
                  name={"Prashant"}
                  image={props.user.image}
                />
              ) : (
                <LeftChatBubble
                  message={m}
                  key={index}
                  name={props.user.name}
                  image={props.user.image}
                />
              )
            )}
            <div ref={bottomRef} /> {/* Ref to scroll into view */}
          </div>
        )}
        <MessageInput newMessageHandler={updateMessages} user={props.user} />
      </div>
    </>
  );
}

export default MessageBox;
