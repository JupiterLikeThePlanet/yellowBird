import React, { useEffect, useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';


const ChatRoom = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // const pubnub = new PubNub({
        //     publishKey: 
        //     subscribeKey: 
        // });

        const currentChannel = "Default";
        const theme = "light";
    }, []);

    return (
        <div>
            {/* MessageList and ChatInput components will go here */}
            <div>Chat room component</div>
        </div>
    );
};

export default ChatRoom;