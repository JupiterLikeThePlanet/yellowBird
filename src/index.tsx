import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import { v4 as uuidv4 } from 'uuid';
import reportWebVitals from './reportWebVitals';

if (!process.env.REACT_APP_PUBLISH_KEY || !process.env.REACT_APP_SUBSCRIBE_KEY) {
  throw new Error("PubNub keys are not set in environment variables");
}

const userId = uuidv4();

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBLISH_KEY!,
  subscribeKey: process.env.REACT_APP_SUBSCRIBE_KEY!,
  userId: userId 
});

console.log(">>>>>> userId: " + userId)


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PubNubProvider client={pubnub}>
        <App />
    </PubNubProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
