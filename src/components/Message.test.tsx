import React from 'react';
import { render, screen, act } from '@testing-library/react'; 
import Message from './Message';

//write tests for
// text wrap using ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

// variables /////////
const testMessage1 = {
  id: '20XX',
  text: 'Can you believe in a thing called love',
  senderId: 'EVA UNIT 00',
  timestamp: new Date('2021-01-01T00:00:00Z'),
  screenName: 'Rei'
};

const testMessage2 = {
  id: '1985',
  text: 'You seem keyed up',
  senderId: 'Big 0',
  timestamp: new Date(),
  screenName: 'Oingo Boingo'
};

const testEditMessage = () => {
  console.log("testEditMessage here!")
}

const userId1 = "EVA UNIT 01"
const userId2 = "Big 0";

describe('Message Component Display', () => {
  test('should display text content correctly', () => {
      render(<Message message={testMessage1} currentUserId={userId1} onEditMessage={testEditMessage} />);

      expect(screen.getByText(/can you believe in a thing called love/i)).toBeInTheDocument();
      expect(screen.getByText('Rei')).toBeInTheDocument();
      expect(screen.getByText(testMessage1.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }))).toBeInTheDocument();
  });

  it('renders the message component without crashing', () => {
    const { getByText } = render(<Message message={testMessage1} currentUserId={userId1} onEditMessage={testEditMessage} />);
    expect(getByText(/Can you believe in a thing called love/i)).toBeInTheDocument();
  });
  
  it('formats and displays the timestamp correctly', () => {
    const { getByText } = render(<Message message={testMessage1} currentUserId={userId1} onEditMessage={testEditMessage} />);
    const formattedTime = testMessage1.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    expect(getByText(formattedTime)).toBeInTheDocument();
  });
  
  it('displays the correct screen name', () => {
    render(<Message message={testMessage1} currentUserId="user123" onEditMessage={testEditMessage}/>);
    expect(screen.getByText('Rei')).toBeInTheDocument();
  });
});

// styling tests
describe('Styling Message Component', () => {
  it('applies correct styling for messages from the current user', () => {
    render(<Message message={testMessage2} currentUserId={userId2} onEditMessage={testEditMessage} />);
    const messageElement = screen.getByText('You seem keyed up');
    const grandParentElement = messageElement.parentElement?.parentElement;
    expect(grandParentElement).toHaveClass('message my-message');
  });

  it('applies correct styling for messages from other users', () => {
    render(<Message message={testMessage2} currentUserId={userId1} onEditMessage={testEditMessage} />);
    const messageElement = screen.getByText('You seem keyed up');
    const grandParentElement = messageElement.parentElement?.parentElement;
    expect(grandParentElement).toHaveClass('message other-message');
  });
});