import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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

beforeEach(() => {
    localStorage.clear();
});
