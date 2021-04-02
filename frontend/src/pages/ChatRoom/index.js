import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
} from "@chatscope/chat-ui-kit-react";
export default function ChatRoom() {
  return (
    <div className="d-flex hstyle">
      <div className="w-5 hstyle">
        <ConversationList></ConversationList>
      </div>
      <div className="w-100 h-100">
        <div><span className = "center"> Name</span></div>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "just now",
                  sender: "Joe",
                }}
              />
            </MessageList>
            <MessageInput placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
