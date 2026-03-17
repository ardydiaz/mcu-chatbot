import React from "react";
import ChatbotIcon from "./component/ChatbotIcon";
import ChatForm from "./component/ChatForm";
import ChatMessage from "./component/ChatMessage";
import { useState } from "react";

// Get env variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = import.meta.env.VITE_GEMINI_URL;

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  
  //helper function to update chat history
  const generateBotResponse = async(history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text }]);
    };

    //format chat history for the API request
    history = history.map(({ role, text}) => ({ role, parts: [{ text }]}));
    
    const requestBody = {
      method: "POST",
      headers:{
        "x-goog-api-key": GEMINI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({contents: history})
    }
    try{
      //api call to get bot response
      const response = await fetch(GEMINI_URL, requestBody);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message || "Failed to generate response");  
      //return data;
      const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1' ).trim(); //extracting the bot response from the API response
      //update the chat history with the bot response
      updateHistory(apiResponse);
    } catch (error) {
      console.error("Error generating bot response:", error);
      //setChatHistory((history) => [...history, { role: "model", text: "Sorry, something went wrong. Please try again later." }]);
    }
  }

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/*Chat bot header content */}
         <div className="chat-header">
           <div className="header-info">
            <ChatbotIcon />
             <h2 className="logo-text">Chatbot</h2>
           </div>
           <button className="material-symbols-rounded">keyboard_arrow_down</button>
         </div>

          {/*Chat bot body content */}
         <div className="chat-body">
           <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">Hello! How can I assist you today?</p>
           </div>

           {/* Render the chat history */}
           {chatHistory.map((chat, index) => (
             <ChatMessage key={index} chat={chat}/> // passing a chat object with role and text properties as a props
           ))}
         </div>

          {/*Chat bot footer content */}
         <div className="chat-footer">
             <ChatForm chatHistory={chatHistory} setChatHistory = {setChatHistory} generateBotResponse={generateBotResponse} />
         </div>
      </div>
    </div>
  );
};

export default App;