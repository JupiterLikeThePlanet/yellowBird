import React, { useEffect, useRef } from 'react';
import Message from './Message';
import '../styles/messageContainer.css';

interface MessageProps {
    id: string;
    text: string;
    senderId: string;
    timestamp: Date;
    screenName: string;
}

interface MessageContainerProps {
    messages: MessageProps[];
    currentUserId: string;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages, currentUserId }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const prevScrollHeight = useRef(0);

    const handleEditMessage = () => {

    }

    useEffect(() => {
        if (containerRef.current) {
            const { current } = containerRef;
            const newMessageHeight = current.scrollHeight - prevScrollHeight.current;
            if (current.scrollTop + current.clientHeight + newMessageHeight >= current.scrollHeight) {
                current.scrollTop = current.scrollHeight;
            }
            prevScrollHeight.current = current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="message-container" ref={containerRef} >
            {messages.map((message) => (
                <div key={message.id} className={message.senderId === currentUserId ? "my-message" : "other-message"}>
                    <Message key={message.id} message={message} currentUserId={currentUserId} onEditMessage={handleEditMessage} />
                </div>
            ))}
        </div>
    );
};

export default MessageContainer;