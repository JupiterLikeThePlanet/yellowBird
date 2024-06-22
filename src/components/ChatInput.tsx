import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react'; 
import '../styles/chatInput.css';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    ///// for single line input ///////////////////////////////////////////////////////////////
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     //console.log("input values" + event.target.value)
    //     // debugger
    //     setMessage(event.target.value);
    // };

    // const handleKeyDown = (event: React.KeyboardEvent) => {
    //     //debugger
    //     // console.log("what key is being pressed: " + event.key)
    //     console.log("is this a shift key: " + event.shiftKey)
        
    //     if (event.key === 'Enter' && !event.shiftKey) {
    //         debugger
    //         event.preventDefault();
    //         sendMessage();
    //     }
    // };

    // <input
    //     type="text"
    //     className="chat-input"
    //     value={message}
    //     onChange={handleInputChange}
    //     onKeyDown={handleKeyDown}
    //     placeholder="Type a message..."
    // />


    ///////////////////////////////////////////////////////////////////////////////

    ///// for mulit line input textArea ///////////////////////////////////////////////////////////////
        const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(event.target.value);
        };
    
        const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault(); // Prevents adding a new line
                if (message.trim() !== '') {
                    onSendMessage(message.trim());
                    setMessage(''); // Clear textarea after sending
                }
            }
        };

        // <textarea
        //     value={message}
        //     onChange={handleInputChange}
        //     onKeyDown={handleKeyDown}
        //     placeholder="use the text area to chat up a storm"
        // />
    ///////////////////////////////////////////////////////////////////////////////

    const sendMessage = () => {
        // console.log("message being sent: " + message.trim())
        if (message.trim() !== '') {
            //debugger
            onSendMessage(message.trim());
            setMessage(''); // Clear input after sending
        }
    };


    return (
        <div className="chat-input-container">
            <textarea
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="use the text area to chat up a storm"
                style={{ minHeight: '20px', maxHeight: '20px', maxWidth:'90%', minWidth:'90%' }}
            />

            <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatInput;