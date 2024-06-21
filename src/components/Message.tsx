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



    return (
        <div className={`message`}>

            <div className="message-content">
                 
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Message;
