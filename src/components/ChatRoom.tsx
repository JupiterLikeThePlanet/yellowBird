import React, { useEffect, useState } from 'react';
import PubNub from 'pubnub';
import { usePubNub } from 'pubnub-react';
import Message from './Message'; 
import ChatInput from './ChatInput';

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
            console.log("Received message:", event.message);
            setMessages(prevMessages => {
                const exists = prevMessages.find(msg => msg.id === newMessage.id);
                return exists ? prevMessages : [...prevMessages, newMessage];
            });
            
        };

        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels: [channel] });

        return () => {
            pubnub.removeListener({ message: handleMessage });
            pubnub.unsubscribeAll();
        };
    }, [pubnub, channel]);



    function sendMessage(message: string): void {
        pubnub.publish({
            channel: 'yellowBirdChat',
            message: { id: Date.now().toString(), text: message, senderId: 'senderID', timestamp: new Date() }
        }).then((response: PubNub.PublishResponse) => {
            console.log("Message Published", response);
        }).catch((error: Error) => {
            console.error("Failed to publish message", error);
        });
    }


    return (
        <div>
            <h1>Chat Room</h1>
            <ChatInput onSendMessage={sendMessage} />
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <Message message={message} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoom;
