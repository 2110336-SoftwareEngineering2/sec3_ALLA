import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";

const messageJson = {//id = chatid
    id: 1,
    content: "",
};

const TestSocket = () => {
    const endpoint = "http://localhost:8300" // เชื่อมต่อไปยัง url ของ realtime server
    const AuthState = useSelector((state) => state.Auth);
    const [socket, setSocket] = useState(null)
    const [token, setToken] = useState(AuthState.token)
    const [input, setInput] = useState('')
    const [message, setmessage] = useState([])

    const send = () => {
        socket.emit("message", { ...messageJson, content: input });
        console.log('send:', { ...messageJson, content: input })
        setInput("");
    };

    const response = () => {
        console.log('call response')
        socket.emit("join", "hi there");
        socket.on("message", (messageNew) => {
            console.log("message :", messageNew);
        });
        socket.on("disconnect", (reason) => {
            console.log('hia rai',reason);
          });
        console.log('socket created');

    };


    const initilizeSocket = async () => {

        // const newSocket = await socketIOClient(endpoint, {
        //     query: { token: token }
        // })
        // console.log(newSocket)
        setSocket(socketIOClient(endpoint, {
            query: { token: token },
            transports: ['websocket'], upgrade: false
        }))
        console.log('stateeeee', );

    }
    useEffect(() => {
        console.log(socket)
        console.log('call UseEffect')
        if (socket != null) response();
    }, [socket])
    const style = { marginTop: 20, paddingLeft: 50 };
    // const { input, message, ...rest } = state;

    return (
        <div>
            <div style={style}>
                <input value={token} onChange={(e) => { setToken(e.target.value) }} />
                <button onClick={() => initilizeSocket()}>Set</button>
            </div>
            <div style={style}>
                <input value={input} onChange={(e) => { setInput(e.target.value) }} />
                <button onClick={() => send()}>Send</button>
            </div>
            {message.map((data, i) => (
                <div key={i} style={style}>
                    {i + 1} : {data}
                </div>
            ))}
        </div>
    );

}



export default TestSocket;
