import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import reportWebVitals from './reportWebVitals';

const pubnub = new PubNub({
  publishKey: 'pub-c-75350107-b960-494a-8f19-dd1e98236eef',
  subscribeKey: 'sub-c-70e805dd-6ce9-419c-aed6-9873b4fed81a',
  userId: '001' 
});


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
