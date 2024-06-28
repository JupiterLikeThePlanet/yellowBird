import React from 'react';
import '../styles/header.css';

interface HeaderProps {
    channel: string;
    onLeaveSession: () => void;
}

const Header: React.FC<HeaderProps> = ({ channel, onLeaveSession }) => {
    return (
        <div className="header">
            <h1 className="title">Yellow Bird Chatter</h1>
            <div className="room-code">Room Code: {channel}</div>

            <button className="leave-session-button" onClick={onLeaveSession}>Leave Session</button>
            
        </div>
    );
};

export default Header;