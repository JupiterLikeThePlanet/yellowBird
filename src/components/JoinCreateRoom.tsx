import React from 'react';

interface JoinCreateRoomProps {
    screenName: string;
    roomCode: string;
    isScreenNameEntered: boolean;
    setRoomCode: (value: string) => void;
    handleJoinRoom: () => void;
    handleCreateRoom: () => void;
    handleChangeName: () => void;
}

const JoinCreateRoom: React.FC<JoinCreateRoomProps> = ({
    screenName,
    roomCode,
    isScreenNameEntered,
    setRoomCode,
    handleJoinRoom,
    handleCreateRoom,
    handleChangeName
}) => {
    return (
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
    );
};

export default JoinCreateRoom;
