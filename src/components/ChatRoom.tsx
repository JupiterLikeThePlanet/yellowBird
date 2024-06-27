import React, { useEffect, useState } from 'react';
import PubNub from 'pubnub';
import { usePubNub } from 'pubnub-react';
import MessageContainer from './MessageContainer';
import ChatInput from './ChatInput';
import Header from './Header';
import '../styles/message.css';
import '../styles/chatRoom.css';

interface MessageObj {
    id: string;
    text: string;
    senderId: string;
    timestamp: Date;
    screenName: string;
}

// clean up header styles between header component and chatRoom component styles 
// clear up the leave session and end session bug 
// give submit name stuff their own classes
// Maybe we don't need an end session, just leave session and if a room has 0 people in it, the channel is terminated

const ChatRoom = () => {
    const pubnub = usePubNub();
    const [messages, setMessages] = useState<MessageObj[]>([]);
    const [channel, setChannel] = useState<string>('');
    const [roomCode, setRoomCode] = useState<string>('');
    const [isCreator, setIsCreator] = useState<boolean>(false);
    const [screenName, setScreenName] = useState<string>('');
    const [isScreenNameEntered, setIsScreenNameEntered] = useState<boolean>(false);
    const [currentUserId, setCurrentUserId] = useState<string>(() => localStorage.getItem('currentUserId') || '');

    useEffect(() => {
        if (!currentUserId) {
            const userId = pubnub.getUUID(); 
            localStorage.setItem('currentUserId', userId);
            setCurrentUserId(userId);
        }
    }, [pubnub, currentUserId]);

    useEffect(() => {
        // useEffect for persistence
        const storedRoomCode = localStorage.getItem('chatRoomCode');
        const storedIsCreator = localStorage.getItem('isCreator') === 'true';
        const storedScreenName = localStorage.getItem('screenName');
        
        localStorage.setItem('isCreator', 'false');

        if (storedScreenName) {
            setScreenName(storedScreenName);
            setIsScreenNameEntered(true);
        }

        if (storedRoomCode) {
            setChannel(storedRoomCode);
            setRoomCode(storedRoomCode);
            setIsCreator(storedIsCreator);
        }
    }, []);

    useEffect(() => {
         
        if (!channel) return;

        pubnub.subscribe({ channels: [channel] });
        fetchHistory();

        const handleMessage = (event: PubNub.MessageEvent) => {
            const newMessage: MessageObj = {
                id: event.message.id,
                text: event.message.text,
                senderId: event.message.senderId,
                timestamp: new Date(Number(event.timetoken) / 10000),
                screenName: event.message.screenName
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
            localStorage.removeItem('chatRoomCode');  
            localStorage.removeItem('isCreator');
        };
    }, [pubnub, channel]);

    const fetchHistory = () => {
        pubnub.fetchMessages({
            channels: [channel],
            count: 100  // Number of messages to retrieve
        }).then((response) => {
            const historicalMessages = response.channels[channel].map(msgEvent => ({
                id: msgEvent.message.id,
                text: msgEvent.message.text,
                senderId: msgEvent.message.senderId,
                screenName: msgEvent.message.screenName,
                timestamp: new Date(Number(msgEvent.timetoken) / 10000)
            }));
            setMessages(historicalMessages);
        }).catch(error => console.error('Error fetching historical messages:', error));
    };


    const handleScreenNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScreenName(event.target.value);
    };

    const handleSubmitName = () => {
        if (screenName.trim().length >= 3) {
            setIsScreenNameEntered(true);
            localStorage.setItem('screenName', screenName);
        } else {
            alert("Screen name must contain at least 3 characters and no spaces");
        }
    };
    

    const handleChangeName = () => {
        setIsScreenNameEntered(false);
        localStorage.removeItem('screenName'); 
    };

    const sendMessage = (message: string): void => {
        if (channel && isScreenNameEntered) {
            const messagePayload = {
                id: Date.now().toString(),
                text: message,
                // senderId: userId,
                senderId: currentUserId,
                screenName: screenName, 
                timestamp: new Date()
            };
            pubnub.publish({ channel, message: messagePayload });
        }
    };



    const subscribeToChannel = () => {
        pubnub.addListener({
            message: handleMessage
        });
    
        pubnub.subscribe({ channels: [channel] });
    };

    const handleMessage = (event: PubNub.MessageEvent) => {
        const newMessage = {
            id: event.message.id,
            text: event.message.text,
            senderId: event.message.senderId,
            screenName: event.message.screenName,
            timestamp: new Date(Number(event.timetoken) / 10000)
        };
    
        setMessages(prevMessages => [...prevMessages, newMessage]);
    };


    const handleJoinRoom = async () => {
        if (roomCode.trim() && isScreenNameEntered) {
            const isValid = await checkRoomValidity(roomCode.trim());
            if (isValid) {
                setChannel(roomCode.trim());
                // using localStorage to set creator
                localStorage.setItem('chatRoomCode', roomCode.trim());
                localStorage.setItem('isCreator', 'false');
            } else {
                alert('Invalid room code');
            }
        }
    };

    const handleCreateRoom = () => {
        const newRoomCode = `BirdNest-${Date.now()}`;
        if (isScreenNameEntered) {
            setChannel(newRoomCode);
            setRoomCode(newRoomCode);
            localStorage.setItem('chatRoomCode', newRoomCode);
            localStorage.setItem('isCreator', 'true');
        }
    };

    const checkRoomValidity = async (code: string): Promise<boolean> => {
        let isValid = false;
        try {
            //From documentation: When a client opens the app, it's often required to discover what other users are already subscribed to that channel (for example, to construct a chat room's online friends list). You can obtain a list of client User IDs, including clients' state data, and the total occupancy of the channel using the Here Now API.
            //https://www.pubnub.com/docs/general/presence/overview
            const response = await pubnub.hereNow({
                channels: [code],
                // includeUUIDs: false, /// keeping this for use later, look up
                includeState: false
            });
    
            // checking channel exists and users present
            if (response && response.totalOccupancy > 0) {
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
        localStorage.removeItem('isCreator');
         
        alert('Chat session ended.');
    };

    const handleLeaveSession = () => {
        pubnub.unsubscribe({
            channels: [channel]
        });
        setChannel('');
        setRoomCode('');
        setMessages([]);
        // this is used to stop auto-rejoin / persistence on refresh
        localStorage.removeItem('chatRoomCode'); 
        localStorage.removeItem('isCreator');
         
        alert('You have left the chat session.');
    };

    return (
        <div>
            {!channel && (
            <div className="join-create-screen">
                
                {!isScreenNameEntered ? (
                    <>
                        <h1>Welcome to Yellow Bird Chat</h1>
                        <div className="join-section">
                            <input
                                type="text"
                                placeholder="Enter screen name"
                                value={screenName}
                                className="join-input"
                                onChange={handleScreenNameChange}
                                maxLength={10}
                            />
                            <button className="join-button" onClick={handleSubmitName}>Submit Name</button>
                        </div>

                    </>
                ) : (
                
                <>
                    <h1>Welcome, {screenName}!</h1>
                    <div className="join-section">
                        <input
                            type="text"
                            className="join-input"
                            placeholder="room code"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                        />
                        <button disabled={!isScreenNameEntered || !roomCode.trim()} className="join-button" onClick={handleJoinRoom}>Join Friends!</button>
                    </div>
                    <div>
                        <hr className="custom-hr"></hr>
                        <button disabled={!isScreenNameEntered} className="create-button" onClick={handleCreateRoom}>Create Room</button>
                        <p></p>
                        <button className="create-button" onClick={handleChangeName}>Update Name</button>
                    </div>
                </>
                )}
            </div>

            )}
            {channel && (
                <>
                    <Header 
                        channel={channel} 
                        isCreator={isCreator} 
                        onEndSession={handleEndSession} 
                        onLeaveSession={handleLeaveSession}
                    />

                    <MessageContainer messages={messages} currentUserId={currentUserId}/>

                    <ChatInput onSendMessage={sendMessage} />
                </>
            )}
        </div>
    );
};

export default ChatRoom;