import React from 'react';
import Message from './Message';

interface MessageProps {
    id: string;
    text: string;
    senderId: string;
    timestamp: Date;
}

interface MessageContainerProps {
    messages: MessageProps[];
    currentUserId: string;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages, currentUserId }) => {
    return (
        <div className="message-container">
            {messages.map((message) => (
                <div key={message.id} className={message.senderId === currentUserId ? "my-message" : "other-message"}>
                    <Message key={message.id} message={message} userId={currentUserId} />
                </div>
            ))}
        </div>
    );
};

export default MessageContainer;