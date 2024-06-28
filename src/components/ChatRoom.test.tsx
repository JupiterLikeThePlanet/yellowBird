import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatRoom from './ChatRoom';
import '@testing-library/jest-dom/extend-expect';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

const localStorageMock = (function() {
    let store: Record<string, string> = {};
    return {
        getItem: function(key: string): string | null {
            return store[key] || null;
        },
        setItem: function(key: string, value: string): void {
            store[key] = value.toString();
        },
        removeItem: function(key: string): void {
            delete store[key];
        },
        clear: function(): void {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

// Setup a PubNub instance for the tests
const pubnub = new PubNub({
    publishKey: 'evangelion',
    subscribeKey: 'neon genesis',
    uuid: 'Unit00'
});

describe('ChatRoom Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders without crashing', () => {
        render(
            <PubNubProvider client={pubnub}>
                <ChatRoom />
            </PubNubProvider>
        );
        expect(screen.getByPlaceholderText(/enter screen name/i)).toBeInTheDocument();
    });

    test('handles screen name submission correctly', () => {
        render(
            <PubNubProvider client={pubnub}>
                <ChatRoom />
            </PubNubProvider>
        );
        fireEvent.change(screen.getByPlaceholderText(/enter screen name/i), { target: { value: 'Shinji' } });
        fireEvent.click(screen.getByText(/submit name/i));
        expect(localStorage.getItem('screenName')).toBe('Shinji');
    });

    test('transitions to join/create room screen after screen name submitted', () => {
        render(
            <PubNubProvider client={pubnub}>
                <ChatRoom />
            </PubNubProvider>
        );
        fireEvent.change(screen.getByPlaceholderText(/enter screen name/i), { target: { value: 'Shinji' } });
        fireEvent.click(screen.getByText(/submit name/i));
        expect(screen.getByText(/join friends!/i)).toBeInTheDocument();
        expect(screen.getByText(/create room/i)).toBeInTheDocument();
    });

    test('persists screen name', () => {
        localStorage.setItem('screenName', 'Shinji Ikari');
        render(
            <PubNubProvider client={pubnub}>
                <ChatRoom />
            </PubNubProvider>
        );
        expect(screen.getByText(/welcome, Shinji Ikari!/i)).toBeInTheDocument();
    });

    test('allows user to change screen name', () => {
        localStorage.setItem('screenName', 'Rei');
        render(
            <PubNubProvider client={pubnub}>
                <ChatRoom />
            </PubNubProvider>
        );
        fireEvent.click(screen.getByText(/Update Name/i));
        expect(screen.getByPlaceholderText(/Enter screen name/i)).toBeInTheDocument();
    });

});
