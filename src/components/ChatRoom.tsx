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
    // const [channel] = useState<string>('yellowBirdChat');
    const [channel, setChannel] = useState<string>('');
    const [roomCode, setRoomCode] = useState<string>('');

    useEffect(() => {
        const storedRoomCode = localStorage.getItem('chatRoomCode');
        if (storedRoomCode) {
            setChannel(storedRoomCode);
            setRoomCode(storedRoomCode);
        }
    }, []);

    useEffect(() => {
        if (!channel) return;

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

    const sendMessage = (message: string): void => {
        if (channel) {
            pubnub.publish({
                channel: channel,
                message: { id: Date.now().toString(), text: message, senderId: 'senderID', timestamp: new Date() }
            }).then((response: PubNub.PublishResponse) => {
                console.log("Message Published", response);
            }).catch((error: Error) => {
                console.error("Failed to publish message", error);
            });
        }
    };

    const handleJoinRoom = () => {
        if (roomCode.trim()) {
            setChannel(roomCode.trim());
        }
    };

    const handleCreateRoom = () => {
        const newRoomCode = `room-${Date.now()}`;
        setChannel(newRoomCode);
        setRoomCode(newRoomCode);  // will displays a code to the user to share with another user, needs validation
    };

    return (
        <div>
            <h1>Secret Chat Room, shhh</h1>
            {!channel && (
                <div>
                    <input
                        type="text"
                        placeholder="room code"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                    <button onClick={handleJoinRoom}>Join Friends!</button>
                    <button onClick={handleCreateRoom}>Create Room</button>
                </div>
            )}
            {channel && (
                <>
                    <p>Room Code: {channel}</p>
                    <ChatInput onSendMessage={sendMessage} />
                    <ul>
                        {messages.map((message) => (
                            <li key={message.id}>
                                <Message message={message} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ChatRoom;
