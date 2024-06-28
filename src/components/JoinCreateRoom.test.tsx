import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import JoinCreateRoom from './JoinCreateRoom';

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

const pubnub = new PubNub({
    publishKey: 'evangelion',
    subscribeKey: 'neon genesis',
    uuid: 'Unit00'
});

beforeEach(() => {
    localStorage.clear();
});

describe('JoinCreateRoom Component', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    test('renders without crashing', () => {
        render(
            <PubNubProvider client={pubnub}>
                <JoinCreateRoom
                    roomCode=""
                    screenName=""
                    setRoomCode={() => {}}
                    handleJoinRoom={() => {}}
                    handleCreateRoom={() => {}}
                    handleChangeName={() => {}}
                    isScreenNameEntered={true}
                />
            </PubNubProvider>
        );
        expect(screen.getByPlaceholderText(/room code/i)).toBeInTheDocument();
        expect(screen.getByText(/join friends!/i)).toBeInTheDocument();
        expect(screen.getByText(/create room/i)).toBeInTheDocument();
    });

    test('handles "Join Room" button click correctly', () => {
        const mockHandleJoinRoom = jest.fn();
        render(
            <PubNubProvider client={pubnub}>
                <JoinCreateRoom
                    roomCode="Unit02"
                    screenName=""
                    setRoomCode={() => {}}
                    handleJoinRoom={mockHandleJoinRoom}
                    handleCreateRoom={() => {}}
                    handleChangeName={() => {}}
                    isScreenNameEntered={true}
                />
            </PubNubProvider>
        );
        fireEvent.change(screen.getByPlaceholderText(/room code/i), { target: { value: '12345' } });
        fireEvent.click(screen.getByText(/join friends!/i));
        expect(mockHandleJoinRoom).toHaveBeenCalled(); 
    });

    test('handles "Create Room" button click correctly', () => {
        const mockHandleCreateRoom = jest.fn();
        render(
            <PubNubProvider client={pubnub}>
                <JoinCreateRoom
                    roomCode=""
                    screenName=""
                    setRoomCode={() => {}}
                    handleJoinRoom={() => {}}
                    handleCreateRoom={mockHandleCreateRoom}
                    handleChangeName={() => {}}
                    isScreenNameEntered={true}
                />
            </PubNubProvider>
        );
        fireEvent.click(screen.getByText(/create room/i));
        expect(mockHandleCreateRoom).toHaveBeenCalled(); 
    });

    test('creates a room correctly when room name is submitted', () => {
        const mockHandleCreateRoom = jest.fn();
        render(
            <PubNubProvider client={pubnub}>
                <JoinCreateRoom
                    roomCode="Unit02"
                    screenName=""
                    setRoomCode={() => {}}
                    handleJoinRoom={() => {}}
                    handleCreateRoom={mockHandleCreateRoom}
                    handleChangeName={() => {}}
                    isScreenNameEntered={true}
                />
            </PubNubProvider>
        );
        fireEvent.click(screen.getByText(/create room/i));
        expect(mockHandleCreateRoom).toHaveBeenCalled();
    });

    test('persists screen name across sessions', () => {
        localStorage.setItem('screenName', 'Asuka');
        render(
            <PubNubProvider client={pubnub}>
                <JoinCreateRoom
                    roomCode="Unit02"
                    screenName={localStorage.getItem('screenName') || ''}
                    setRoomCode={() => {}}
                    handleJoinRoom={() => {}}
                    handleCreateRoom={() => {}}
                    handleChangeName={() => {}}
                    isScreenNameEntered={true}
                />
            </PubNubProvider>
        );
        expect(screen.getByText(/welcome, Asuka!/i)).toBeInTheDocument();
    });

    test('allows user to change screen name', () => {
        const mockHandleChangeName = jest.fn();
        render(
            <PubNubProvider client={pubnub}>
                <JoinCreateRoom
                    screenName=""
                    roomCode=""
                    setRoomCode={() => {}}
                    handleJoinRoom={() => {}}
                    handleCreateRoom={() => {}}
                    handleChangeName={mockHandleChangeName}
                    isScreenNameEntered={true}
                />
            </PubNubProvider>
        );
        fireEvent.click(screen.getByText(/update name/i));
        expect(mockHandleChangeName).toHaveBeenCalled();
    });
});