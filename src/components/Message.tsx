import React from 'react';
import '../styles/message.css';

interface MessageProps {
    message: {
        id: string;
        text: string;
        senderId: string;
        timestamp: Date;
        screenName: string;
    };
    userId: string;
}

const Message: React.FC<MessageProps> = ({ message, userId }) => {
    const { text, senderId, timestamp, screenName } = message;
    const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    const isCurrentUser = senderId === userId;;
    // Custom class for styling messages by the current user differently
    const messageClass = isCurrentUser ? 'my-message' : 'other-message';

    console.log("messageClass: " + messageClass)

    

    return (
        <div className={`message ${senderId === userId ? 'my-message' : 'other-message'}`}>
            <div className="message-info">
                <span className="message-sender">{screenName} </span>
                @
                <span className="message-time">{formattedTime}</span>
            </div>
            <div className="message-content">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Message;
