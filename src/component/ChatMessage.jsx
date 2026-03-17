import React from "react";  
import ChatbotIcon from "../component/ChatbotIcon";
const ChatMessage = ({ chat }) => {
    return (
        <div className={`message ${chat.role == "model" ? 'bot' : 'user'}-message`}> {/*updating the calss name base on the role*/}
            {chat.role == "model" && <ChatbotIcon />} {/*rendering the chatbot icon only if the role is model*/}   
            <p className="message-text">{chat.text}</p>
        </div>
    )
}

export default ChatMessage; 