import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useCallback, useEffect, useState } from "react";
import avatar1 from "../../assets/logo/dog1.jpg";
import avatar2 from "../../assets/logo/dog2.jpg";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Conversation,
  Avatar,
  Sidebar,
  Search,
  ConversationHeader,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
export default function ChatRoom() {
  // Set initial message input value to empty string
  const [messageInputValue, setMessageInputValue] = useState("");

  return (
    <div
      style={{
        height: "600px",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar src={avatar1} name="Lilly" status="available" />
            </Conversation>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar src={avatar2} name="Lilly" status="available" />
            </Conversation>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar src={avatar1} name="Lilly" status="available" />
            </Conversation>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar src={avatar2} name="Lilly" status="available" />
            </Conversation>
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={avatar1} name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
          </ConversationHeader>
          <MessageList>
            <MessageSeparator content="datetime" />
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
