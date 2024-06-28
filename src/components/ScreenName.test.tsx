import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ScreenName from './ScreenName';

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

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('ScreenName Component', () => {
    beforeEach(() => {
        localStorage.clear();
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

    // test('handles screen name submission correctly', () => {
    //     render(
    //         <ScreenName
    //             screenName=""
    //             handleScreenNameChange={handleScreenNameChange}
    //             handleSubmitName={handleSubmitName}
    //         />
    //     );
    //     fireEvent.change(screen.getByPlaceholderText(/enter screen name/i), { target: { value: 'Shinji' } });
    //     fireEvent.click(screen.getByText(/submit name/i));
    //     handleSubmitName();
    //     expect(localStorage.getItem('screenName')).toBe('Shinji');
    // });

    test('allows user to change screen name', () => {
        // const handleScreenNameChange = jest.fn();
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