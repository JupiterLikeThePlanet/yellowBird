import React, {useState} from 'react';
import '../styles/message.css';
import editMessageIcon from '../assets/images/52.Message.svg';


interface MessageProps {
    message: {
        id: string;
        text: string;
        senderId: string;
        timestamp: Date;
        screenName: string;
    };
    currentUserId: string;
    onEditMessage: (id: string, newText: string) => void; 
}

const Message: React.FC<MessageProps> = ({ message, currentUserId, onEditMessage  }) => {
    const { id, text, senderId, timestamp, screenName } = message;
    const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    const isCurrentUser = senderId === currentUserId;
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEditMessage(id, editText.trim()); // Pass updated text to parent
        setIsEditing(false);
    };
    

    // Custom class for styling messages by the current user differently
    const messageClass = isCurrentUser ? 'my-message' : 'other-message';
    console.log("messageClass:", messageClass)
    return (
        <div className={`message ${messageClass}`}>
            <div className="message-info">
                <span className="message-sender">{screenName} </span>
                @
                <span className="message-time">{formattedTime}</span>
            </div>
            <div className="message-content">
            {isCurrentUser && !isEditing && (
                <div>
                    <button className="edit-button" onClick={() => setIsEditing(true)}>
                        <img src={editMessageIcon} alt="Edit" className="edit-icon" />
                    </button>
                    {text}
                </div>
            )}
            {isCurrentUser && isEditing && (
                <div>
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="edit-textarea"
                    />
                    <button className="save-button" onClick={handleSaveClick}>
                        Save
                    </button>
                </div>
            )}
            </div>
        </div>
    );
};

export default Message;
