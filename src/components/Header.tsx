import React from 'react';
import '../styles/header.css';

interface HeaderProps {
    channel: string;
    isCreator: boolean;
    onEndSession: () => void;
    onLeaveSession: () => void;
}

const Header: React.FC<HeaderProps> = ({ channel, isCreator, onEndSession, onLeaveSession }) => {
    return (
        <div className="header">
            <h1 className="title">Yellow Bird Chatter</h1>
            <div className="room-code">Room Code: {channel}</div>
            {isCreator ? (
                <button className="end-session-button" onClick={onEndSession}>End Session</button>
            ) : (
                <button className="leave-session-button" onClick={onLeaveSession}>Leave Session</button>
            )}
        </div>
    );
};

export default Header;


// {channel && (isCreator ? (
//     <button className="end-session-button" onClick={onEndSession}>End Session</button>
// ) : (
//     <button className="leave-session-button" onClick={onLeaveSession}>Leave Session</button>
// ))}