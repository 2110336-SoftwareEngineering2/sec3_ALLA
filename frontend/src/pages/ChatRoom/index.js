import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useCallback, useEffect, useState } from "react";
import avatar1 from "../../assets/logo/dog1.jpg";
import avatar2 from "../../assets/logo/dog2.jpg";
import axios from 'axios'
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
import TestSocket from "./TestSocket";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
export default function ChatRoom(props) {
  // Set initial message input value to empty string
  const [messageInputValue, setMessageInputValue] = useState("");
  const [chatList, setChatList] = useState([])
  const history = useHistory()
  const AuthState = useSelector((state) => state.Auth)
  //join socket
  //

  const createChat = async (from, to) => {
    const members = {
      "members": [1, 2]
    }
    await axios
      .post("http://127.0.0.1:8300/room", {
        //Post input
        ...members
      }, {
        headers: {
          Authorization: "Bearer " + AuthState.token,
        },
      })
      .then((response) => {

        if (response.status === 201) {

          //create job success
          alert("Create chat!")
          // history.push('/managejob')
        }

      })
      .catch((error) => {
        alert('chat already exist');
        console.log(error.response);

      });

  }
  const getChatByUid = async (id) => {

    await axios
      .get(`http://127.0.0.1:8300/user/chatRoom/${id}`,
        {
          headers: {
            Authorization: "Bearer " + AuthState.token,
          },
        })
      .then((response) => {
        console.log(response.data)
        if (response.status === 201) {
          setChatList(response.data)
        }
        return response;
      })
      .catch((error) => {
        alert('chat already exist');
        console.log(error.response);
        return error;
      });

  }
  useEffect(() => {
    //join socket
    //create Chat
    getChatByUid(props.match.params.uid)
    if (AuthState.id !== props.match.params.uid) createChat(AuthState.id, props.match.params.uid)
    console.log('chatLLLIST',chatList)
  }, [])
  return (
    <div
      style={{
        height: "511px",
        width: "100%",
        position: "relative",
        bottom: '0',
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            <div>userid: {props.match.params.uid}</div>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
              onClick={() => { history.push('/chat/Lilly') }}
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
            />
          </ConversationHeader>
          <MessageList typingIndicator={messageInputValue !== "" ? <TypingIndicator content="แหน่ะ พิมใช่มั้ย" /> : <></>}>
            <MessageSeparator content={new Date().toDateString()} />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "single"
            }}>
              <Avatar src={avatar1} name="Zoe" />
            </Message>
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "outgoing",
              position: "single"
            }}>
              <Avatar src={avatar1} name="Zoe" />
            </Message>
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "single"
            }}>
              <Avatar src={avatar1} name="Zoe" />
            </Message>
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "single"
            }}>
              <Avatar src={avatar1} name="Zoe" />
            </Message>
            <MessageSeparator content={'new message'} />
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "outgoing",
              position: "single"
            }}>
              <Avatar src={avatar1} name="Zoe" />
            </Message>
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "single"
            }}>
              <Avatar src={avatar1} name="Zoe" />
            </Message>
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "single"
            }}>
              <Avatar src={avatar1} name="Zoe" />
            </Message>
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "outgoing",
              position: "single"
            }}>
              <Avatar src={avatar1} name="Zoe" />
            </Message>
            <Message model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "single"
            }}>
              <Avatar src={avatar1} name="Zoe" />
            </Message>

          </MessageList>

          <MessageInput
            // attachButton={false}
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
          />
        </ChatContainer>
      </MainContainer>
      <TestSocket></TestSocket>
    </div>
  );
}
