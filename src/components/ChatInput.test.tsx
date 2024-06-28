import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatInput from './ChatInput';

describe('ChatInput Component', () => {
    const mockSendMessage = jest.fn();

    it('should render text area and buttons', () => {
        render(<ChatInput onSendMessage={jest.fn()} />);
        expect(screen.getByPlaceholderText(/chat up a storm/i)).toBeInTheDocument();
        expect(screen.getByText('Send')).toBeInTheDocument();
        expect(screen.getByText('😊')).toBeInTheDocument();
    });

    it('should update text area on user input', () => {
        render(<ChatInput onSendMessage={jest.fn()} />);
        const input = screen.getByPlaceholderText(/chat up a storm/i);
        userEvent.type(input, 'Hello, World!');
        expect(input).toHaveValue('Hello, World!');
    });

    test('pressing Enter sends the message', () => {
        const mockOnSendMessage = jest.fn();
        render(<ChatInput onSendMessage={mockOnSendMessage} />);
        const input = screen.getByPlaceholderText(/chat up a storm/i);
        userEvent.type(input, 'Hello, World!{enter}');
        expect(mockOnSendMessage).toHaveBeenCalledWith('Hello, World!');
    });

    test('pressing send button triggers onSendMessage', () => {
        render(<ChatInput onSendMessage={mockSendMessage} />);
        const input = screen.getByPlaceholderText(/chat up a storm/i);
        fireEvent.change(input, { target: { value: 'Hello' } });
        fireEvent.click(screen.getByText('Send'));
        expect(mockSendMessage).toHaveBeenCalledWith('Hello');
    });

    it('should clear input after sending message', async () => {
        render(<ChatInput onSendMessage={jest.fn()} />);
        const input = screen.getByPlaceholderText(/chat up a storm/i);
        await userEvent.type(input, 'Hello, World!');
        await userEvent.type(input, '{enter}'); 
    
        await waitFor(() => {
            expect(input).toHaveValue('');
        });
    });

    test('does not send empty messages', () => {
        render(<ChatInput onSendMessage={mockSendMessage} />);
        const input = screen.getByPlaceholderText(/chat up a storm/i);
        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(screen.getByText('Send'));
        expect(mockSendMessage).not.toHaveBeenCalled();
    });


});