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
    const [isCreator, setIsCreator] = useState<boolean>(false);


    useEffect(() => {
        const storedRoomCode = localStorage.getItem('chatRoomCode');
        const storedIsCreator = localStorage.getItem('isCreator') === 'true';
        console.log("in useEffect ///////")
        console.log("storedRoomCode : " + storedRoomCode)
        console.log("storedIsCreator : " + storedIsCreator)
        console.log("////// ////// ///////")

        if (storedRoomCode) {
            setChannel(storedRoomCode);
            setRoomCode(storedRoomCode);
            setIsCreator(storedIsCreator);
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

    const handleJoinRoom = async () => {
        if (roomCode.trim()) {
            const isValid = await checkRoomValidity(roomCode.trim());
            if (isValid) {
                setChannel(roomCode.trim());
                // using localStorage to set creator
                localStorage.setItem('chatRoomCode', roomCode.trim());
                localStorage.setItem('isCreator', 'false');
                //debugger
                console.log("////////////in handlejoinroom///////////////////")
                console.log("isCreator: " + localStorage.isCreator )
                console.log("chatRoomCode: " + localStorage.chatRoomCode)
                console.log("/////////////////////////////////////")
            } else {
                alert('Invalid room code');
            }
        }
    };

    const handleCreateRoom = () => {
        const newRoomCode = `BirdNest-${Date.now()}`;
        setChannel(newRoomCode);
        setRoomCode(newRoomCode);
        // Save the new room code
        localStorage.setItem('chatRoomCode', newRoomCode);
    };

    const checkRoomValidity = async (code: string): Promise<boolean> => {
        let isValid = false;
        try {
            const response = await pubnub.fetchMessages({
                channels: [code],
                count: 1  
            });
    
            if (response && response.channels && response.channels[code] && response.channels[code].length > 0) {
                isValid = true;
            }
        } catch (error) {
            console.error('Failed to check room validity:', error);
        }
        return isValid;
    };

    const handleEndSession = () => {
        pubnub.unsubscribe({ channels: [channel] });
        setChannel('');
        setRoomCode('');
        setMessages([]);
        localStorage.removeItem('chatRoomCode');  
        alert('Chat session ended.');
    };

    return (
        <div>
            <h1>Yellow Bird Chatter</h1>
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
                    <button onClick={handleEndSession}>End Session</button>
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
