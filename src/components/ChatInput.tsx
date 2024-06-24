import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import EmojiClickData from 'emoji-picker-react';
import IEmojiData  from 'emoji-picker-react';
import '../styles/chatInput.css';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

interface EmojiData {
    emoji: string;
}


const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);


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


    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ///// for multi line input textArea ///////////////////////////////////////////////////////////////
        const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(event.target.value);
        };
    
        const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault(); 
                if (message.trim() !== '') {
                    onSendMessage(message.trim());
                    setMessage(''); 
                }
            }
        };
    ///////////////////////////////////////////////////////////////////////////////

    const onEmojiClick = (emojiData: EmojiData) => { // , event: React.MouseEvent<Element, MouseEvent>
        setMessage(prevMessage => prevMessage + emojiData?.emoji); 
        setShowEmojiPicker(false);
    };

    const sendMessage = () => {
        if (message.trim() !== '') {
            onSendMessage(message.trim());
            setMessage(''); 
        }
    };

    return (
        <div className="chat-input-container">
            <textarea
                className="chat-input"
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="use the text area to chat up a storm"
            />
            {showEmojiPicker && (
                <div className="emoji-picker">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
            )}
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="emoji-button">
                😊
            </button>
            <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
    );
    
};

export default ChatInput;