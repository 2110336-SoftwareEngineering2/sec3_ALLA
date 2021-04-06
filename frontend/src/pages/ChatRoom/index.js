import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
// import TestSocket from "./TestSocket";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
// import ChatTest from './ChatTest'
// import socketIOClient from "socket.io-client";
export default function ChatRoom(props) {
  // Set initial message input value to empty string
  const history = useHistory()
  const AuthState = useSelector((state) => state.Auth)
  const [chatConvoList, setChatConvoList] = useState([])
  const [currentChatRoom, setCurrentChatRoom] = useState()
  const [privateChat, setPrivateChat] = useState()
  //join socket
  const [input, setInput] = useState('')

  const send = async () => {
    await axios
      .post("http://127.0.0.1:8300/room/message", {
        "id": currentChatRoom.id, //room id
        "author": AuthState.id, //user id
        "content": input, //message
      })
      .then((response) => {
        console.log('message sent successfully', response)
        // const tmpMsg=[...currentChatRoom.message,chatObj]
        setCurrentChatRoom({
          ...currentChatRoom, message: [...currentChatRoom.message, {
            "id": currentChatRoom.id, //room id
            "author": { id: AuthState.id }, //user id
            "content": input, //message
          }]
        })
        console.log(currentChatRoom)
        setInput('')

      })
      .catch((error) => {
        // alert('unable to send message');
        // console.log('chat already exist');

      });
  }
  const createChat = async (from, to) => {
    const members = {
      "members": [from, to]
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
          console.log("Create chat! with member", members)
          // history.push('/managejob')
        }

      })
      .catch((error) => {
        // alert('chat already exist');
        console.log("chat already created with member", members);

      });

  }
  const getChatRoomByUid = async (id) => {

    await axios
      .get(`http://127.0.0.1:8300/user/chatRoom/${id}`,
        {
          headers: {
            Authorization: "Bearer " + AuthState.token,
          },
        })
      .then((response) => {
        // console.log(response.data)
        setChatConvoList(response.data)
        response.data.map((currElement, index) => {
          console.log(currElement.members.length, AuthState.id)
          if (currElement.members.length === 1) setPrivateChat(currElement)
          else if ((currElement.members[0].id.toString() === AuthState.id && currElement.members[1].id.toString() === props.match.params.uid) || (currElement.members[1].id.toString() === AuthState.id && currElement.members[0].id.toString() === props.match.params.uid)) {
            setCurrentChatRoom(currElement)
          }
        })

        console.log('get chatList', response.data)
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
    if (AuthState.id !== props.match.params.uid) {
      createChat(AuthState.id, props.match.params.uid)
      getChatRoomByUid(props.match.params.uid)
    }
    else {
      console.log('the chat is blank')
    }

  }, [])

  useEffect(() => {
    console.log('currentChatRoom', currentChatRoom)
    console.log('private chat', privateChat)
  }, [currentChatRoom, privateChat])
  const getMessageList = () => {

    return (
      <MessageList typingIndicator={input !== "" ? <TypingIndicator content="แหน่ะ พิมใช่มั้ย" /> : <></>}>
        <MessageSeparator content={new Date().toDateString()} />
        {(currentChatRoom) ? currentChatRoom.message.map((data, i) => {
          let lastDisplayDate = new Date()
          console.log(data.author.id, AuthState.id)
          return (
            <Message key={i} model={{
              message: data.content,
              sentTime: data.timestamp,
              sender: "Zoe",
              direction: data.author.id == AuthState.id ? "outgoing" : "incoming",
              position: "single"
            }}>
              <Avatar src={avatar1} name="Zoe" />
            </Message>
          )
        }) : <></>}

      </MessageList>
    )
  }

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
          <div>userid: {props.match.params.uid}</div>
          <ConversationList>
            {(chatConvoList) ? chatConvoList.map((data, i) => {
              console.log('dataaaaaaaaaaaaa', data)
              let otherUser;
              if (data.members.length === 1)
                otherUser = null
              else {
                if (data.members[0].id.toString() !== AuthState.id) otherUser = data.members[0]
                else otherUser = data.members[1]
              }
              if (otherUser && data) return (<Conversation
                name={`${otherUser.firstName} ${otherUser.lastName}`}
                lastSenderName={data.message[data.message.length - 1].author.firstName}
                info={data.message[data.message.length - 1].content}
                onClick={() => { history.push(`/chat/${otherUser.id}`) }}
              >
                <Avatar src={avatar1} name="Lilly" status="available" />
              </Conversation>
              )
            }) : <></>}


          </ConversationList>
        </Sidebar>

        <ChatContainer>
          {AuthState.id !== props.match.params.uid ? <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={avatar1} name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
            />
          </ConversationHeader> : <></>}

          {AuthState.id !== props.match.params.uid ? getMessageList() : <></>}


          <MessageInput

            placeholder="Type message here"
            value={input}
            onChange={(val) => setInput(val)}
          />
        </ChatContainer>
      </MainContainer>
      <div >
        <input value={input} onChange={(e) => { setInput(e.target.value) }} />
        <button onClick={() => send()}>Send</button>
      </div>

    </div>
  );
}
