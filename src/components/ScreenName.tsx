import React from 'react';
import '../styles/screenName.css';

interface ScreenNameProps {
    screenName: string;
    handleScreenNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitName: () => void;
}

const ScreenName: React.FC<ScreenNameProps> = ({ screenName, handleScreenNameChange, handleSubmitName }) => {
    return (
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
    );
};

export default ScreenName;