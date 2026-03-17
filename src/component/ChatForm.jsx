import React from "react";
import { useRef } from "react";

const ChatForm = ({setChatHistory,generateBotResponse, chatHistory }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault(); //prevent the form from submitting
        const userMessage = inputRef.current.value.trim(); //get the value of the input field and removing whitespace from both ends of the string
        if(!userMessage) return; //if the user message is empty, return
        inputRef.current.value  = ""; //clear the input field
        
        //update the chat history with the new user message   
        setChatHistory((history) => [...history, { role: "user", text: userMessage }]); 

        //display 600ms before showing the thinking placeholder and generating the bot response
        setTimeout(() => {
            //add thinking placeholder to the chat history after a delay of 600 milliseconds 
            setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
            generateBotResponse([...chatHistory, { role: "user", text: userMessage }]); //call the generateBotResponse function with the updated chat history   
        }, 600);
    
        
    }
    return (
       <form action="" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" className="message-input" placeholder="Message...." required/>
            <button className="material-symbols-rounded">arrow_upward</button>
        </form>
    )
}

export default ChatForm;