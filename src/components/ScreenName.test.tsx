import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ScreenName from './ScreenName';
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

const handleScreenNameChange = jest.fn();
const handleSubmitName = jest.fn();

const pubnub = new PubNub({
    publishKey: 'evangelion',
    subscribeKey: 'neon genesis',
    uuid: 'Unit00'
});

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('ScreenName Component', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <ScreenName 
                screenName=""
                handleScreenNameChange={() => {}}
                handleSubmitName={() => {}}
            />
        );
        expect(screen.getByPlaceholderText(/enter screen name/i)).toBeInTheDocument();
    });

    test('localStorage mock works as expected', () => {
        localStorage.setItem('screenName', 'Shinji');
        expect(localStorage.getItem('screenName')).toBe('Shinji');
    });

    test('handles screen name submission correctly', () => {
        const handleSubmitName = jest.fn(() => {
            localStorage.setItem('screenName', 'Shinji');
        });

        render(
            <PubNubProvider client={pubnub}>
                <ScreenName handleSubmitName={handleSubmitName} />
            </PubNubProvider>
        );

        fireEvent.change(screen.getByPlaceholderText(/enter screen name/i), { target: { value: 'Shinji' } });
        fireEvent.click(screen.getByText(/submit name/i));
        expect(localStorage.getItem('screenName')).toBe('Shinji');
        expect(handleSubmitName).toHaveBeenCalled();
    });

    test('allows user to change screen name', () => {
        render(
            <ScreenName 
                screenName="Rei"
                handleScreenNameChange={() => {}}
                handleSubmitName={() => {}}
            />
        );
        fireEvent.click(screen.getByText(/Submit Name/i));
        expect(screen.getByPlaceholderText(/Enter screen name/i)).toBeInTheDocument();
    });
});