import React, { useEffect, useState } from 'react';
import PubNub from 'pubnub';
import { usePubNub } from 'pubnub-react';

interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: Date;
}

const ChatRoom = () => {
    const pubnub = usePubNub();
    const [messages, setMessages] = useState<Message[]>([]);
    const [channel] = useState<string>('yellowBirdChat');

    useEffect(() => {
        const handleMessage = (event: PubNub.MessageEvent) => {
            const newMessage: Message = {
                id: event.message.id,
                text: event.message.text,
                senderId: event.message.senderId,
                timestamp: new Date(Number(event.timetoken) / 10000)
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels: [channel] });

        return () => pubnub.unsubscribeAll();
    }, [pubnub, channel]);

    return (
        <div>
            <h1>Chat Room</h1>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        {message.senderId}: {message.text} ({message.timestamp.toLocaleTimeString()})
                    </li>
                ))}
            </ul>
        
        </div>
    );
};

export default ChatRoom;
