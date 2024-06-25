import React from 'react';

interface HeaderProps {
    channel: string;
    isCreator: boolean;
    onEndSession: () => void;
}

const Header: React.FC<HeaderProps> = ({ channel, isCreator, onEndSession }) => {
    return (
        <div className="header">
            <h1 className="title">Yellow Bird Chatter</h1>
            <div className="room-code">Room Code: {channel}</div>
            {!isCreator && (
                <button className="end-session-button" onClick={onEndSession}>
                    End Session
                </button>
            )}
        </div>
    );
};

export default Header;