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

        setChatConvoList(response.data)
        response.data.map((currElement, index) => {

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
    setInterval(() => {
      if (AuthState.id !== props.match.params.uid) {
        createChat(AuthState.id, props.match.params.uid)
        getChatRoomByUid(AuthState.id)
      }
      else {
        getChatRoomByUid(AuthState.id)
        console.log('the chat is blank')
      }
    }, 1000);

  }, [])

  useEffect(() => {
    console.log('currentChatRoom', currentChatRoom)
    //   console.log('private chat', privateChat)
  }, [currentChatRoom])
  // }, [currentChatRoom, privateChat])
  const getMessageList = () => {
    let lastSeparator;
    let needSeparator = true;

    let otherUser = null;
    let currUser = null
    if (currentChatRoom) {
      if (currentChatRoom.members.length === 2) {
        if (currentChatRoom.members[0].id.toString() !== AuthState.id && currentChatRoom.members[1].id.toString() === AuthState.id) {
          otherUser = currentChatRoom.members[0]
          currUser = currentChatRoom.members[1]
        }
        else if (currentChatRoom.members[1].id.toString() !== AuthState.id && currentChatRoom.members[0].id.toString() === AuthState.id) {
          otherUser = currentChatRoom.members[1]
          currUser = currentChatRoom.members[0]
        }

      }
    }
    // console.log(otherUser,currUser)
    return (
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar src="https://picsum.photos/200" name={"Zoe"} />
          <ConversationHeader.Content
            userName={otherUser?otherUser.firstName:''}
          />
        </ConversationHeader>
        <MessageList typingIndicator={input !== "" ? <TypingIndicator /> : <></>}>
          {(currentChatRoom) ? currentChatRoom.message.map((data, i) => {
            if (!data.timestamp) {
              needSeparator = false
            }
            else if (lastSeparator !== data.timestamp.split('T')[0].toString()) {
              lastSeparator = data.timestamp.split('T')[0].toString()
              needSeparator = true
            }
            else needSeparator = false
            if (needSeparator) console.log(needSeparator)
            return (
              <>
                {needSeparator ? <MessageSeparator content={lastSeparator} /> : <></>}
                <Message key={i} model={{
                  message: data.content,
                  sentTime: data.timestamp,
                  sender: data.author.id.firstName,
                  direction: data.author.id == AuthState.id ? "outgoing" : "incoming",
                  position: "single"
                }}>
                  {/* <Avatar src={avatar1} name="Zoe" /> */}
                </Message>
              </>
            )
          }) : <></>}
        </MessageList>
        <MessageInput

          placeholder="Type message here"
          value={input}
          onChange={(val) => setInput(val)}
          onSend={send}
        />
      </ChatContainer>

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
          <ConversationHeader style={{
            backgroundColor: "#C6E3FA",
            height: 62.18,
          }}>
            <ConversationHeader.Content>
              <span style={{
                color: "black",
                fontSize: 18,
                alignSelf: "flex-center"
              }}>Recent Chat</span>
            </ConversationHeader.Content>
          </ConversationHeader>
          <ConversationList>
            {(chatConvoList) ? chatConvoList.map((data, i) => {
              let otherUser = null;

              if (data.members.length === 2) {
                if (data.members[0].id.toString() !== AuthState.id && data.members[1].id.toString() === AuthState.id) otherUser = data.members[0]
                else if (data.members[1].id.toString() !== AuthState.id && data.members[0].id.toString() === AuthState.id) otherUser = data.members[1]
                else otherUser = null
              }
              if (otherUser && data) return (<Conversation
                name={`${otherUser.firstName} ${otherUser.lastName}`}
                lastSenderName={data.message.length !== 0 ? data.message[data.message.length - 1].author.firstName : ''}
                info={data.message.length !== 0 ? data.message[data.message.length - 1].content : ''}
                onClick={() => { history.push(`/chat/${otherUser.id}`) }}
              >
                <Avatar src="https://picsum.photos/200" name="Lilly" status="available" />
              </Conversation>
              )
            }) : <></>}


          </ConversationList>
        </Sidebar>
        {AuthState.id !== props.match.params.uid ? getMessageList() : <></>}
      </MainContainer>

    </div>
  );
}
