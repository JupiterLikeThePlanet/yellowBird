import React from 'react';
import '../styles/message.css';

interface MessageProps {
    message: {
        id: string;
        text: string;
        senderId: string;
        timestamp: Date;
    };
}

const Message: React.FC<MessageProps> = ({ message }) => {
    const { text, senderId, timestamp } = message;

    // Formatting the timestamp for better readability
    const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    // Custom class for styling messages by the current user differently
    const messageClass = senderId === "001" ? "my-message" : "other-message";

    return (
        <div className={`message ${messageClass}`}>
            <div className="message-info">
                <span className="message-sender">{senderId}</span>
                <span className="message-time">{formattedTime}</span>
            </div>
            <div className="message-content">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Message;
