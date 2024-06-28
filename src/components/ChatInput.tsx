import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
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

    // for multi line input textArea [versus normal input element]
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

    const onEmojiClick = (emojiData: EmojiData) => { 
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