import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import swal from 'sweetalert';
import { addConversation, clearConversation } from './Redux/Slice';
import { useDispatch, useSelector } from 'react-redux';

const ChatBox = () => {

    const [conversation, setConversation] = useState([])
    const [input, setInput] = useState('')
    const [userName, setUserName] = useState("");
    const dispatch = useDispatch();

    const handleUserName=()=>{
        const name= prompt("Enter your name")
        setUserName(name)

    }

    const handleInput = (e) => {
        if(userName==""){
            handleUserName();
        }
        setInput(e.target.value)
    }

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setConversation([...conversation, userMessage]);
        dispatch(addConversation({role:"user", content: userMessage}))
        setInput('');
        console.log(input)
        try {
            const response = await axios.post('http://127.0.0.1:5000/get_chat', {
                input: input
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data
            const botMessage = { role: 'bot', content: data.reply };
            dispatch(addConversation({role:"AI", content: botMessage}))
            setConversation((prev) => [...prev, botMessage])
        } catch (e) {
            console.error("Error : ", e)
        }
    }
    const handleStop = () => {
        setConversation([]);
        dispatch(clearConversation())
        swal("Chat Stoped!", "type again to start the chat!", "success");

    }
    return (
        <>        
            <div className='ChatArea-container'>
                <div className="chatarea-Header">
                    <div className="Header-text">{
                        userName!="" ?
                        <p className="con-title">{userName}</p>:
                        <p className="con-title">Chat Bot</p>
                        }
                    </div>
                </div>
                <div className='Message-container'>
                        
                        {conversation.map((msg, index) => (
                            <div key={index} className={msg.role === 'user' ? 'user-msg' : 'bot-msg'}>
                                {msg.role==="user"? <p className='con-icon'>U</p> : <p className='con-icon'>AI</p>}
                                {msg.content}
                            </div>
                        ))}
                </div>
                <div className="input-group input-group-sm mb-3 input-box">
                    <input type="text" className="form-control"
                        placeholder='Enter Text here'
                        value={input}
                        onChange={handleInput}
                    />
                    {/* { endButton ? <button type="button" className="btn btn-info"
                        onClick={handleStop}>
                            <StopCircleIcon />
                    </button> : <p>Start</p>} */}
                    <button type="button" className="btn btn-info"
                        onClick={handleStop}>
                        <StopCircleIcon />
                    </button>

                    <button type="button" className="btn btn-info"
                        onClick={handleSend}>
                        <SendIcon />
                    </button>
                </div>
            </div>
        </>
    )
}

export default ChatBox