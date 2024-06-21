import React from 'react';
import { render, screen, act } from '@testing-library/react'; 
import Message from './Message';

describe('Message Component', () => {
  test('should display text content correctly', () => {
    const testMessage = {
      id: '20XX',
      text: 'Can you believe in a thing called love',
      senderId: 'EVA UNIT 00',
      timestamp: new Date('2021-01-01T00:00:00Z')
    };

    render(<Message message={testMessage} />);
    expect(screen.getByText(/can you believe in a thing called love/i)).toBeInTheDocument();
    expect(screen.getByText('EVA UNIT 00')).toBeInTheDocument();
  });
});