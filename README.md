# Yellow Bird Chat


## Objective:
Build a real-time, two-way chat application using ReactJS and integrate it with a free account on PubNub.

## Task Details:
To demonstrate your skills around front-end development and integration with 3rd party APIs, you are asked to build a
fake real-time two-way chat between two clients.



## SETUP
Prerequisites
Node.js (v12.x or later)
NPM (v6.x or later)

- from the github link ```https://github.com/JupiterLikeThePlanet/yellowbird``` there will be a green button that says "Code". Click on it
- A tiny window will open below it and in it will be a url that should look like ```https://github.com/JupiterLikeThePlanet/yellowbird.git```. Copy that or just go ahead and copy it from here.
- Open up terminal, and in a desired directory of choice, enter the following command
```git clone <URL_OF_REPOSITORY>```

- ensure node and npm are installed and up to date.  Check in terminal using 'node -v' and 'npm -v" respectively.  If neither is installed or is out of date run:
```
sudo apt-get install nodejs
npm install npm@latest || npm install -g npm@latest  
```  

- Otherwise in terminal, please first run 
```
npm install
```

- Ensure to configure PubNub Keys before deploying the app (see the pubnub setup section)

- Then run
```
npm start
```

- This should open a window in a browser of choice and put you at the landing page. If you manually need the url it is:
```http://localhost:3000/```

## Pubnub setup 
Obtain your keys from the PubNub dashboard and set them in your .env file 

Here is a link to creating keys
> https://www.pubnub.com/how-to/admin-portal-create-keys/

Create an Account:
- Visit PubNub and sign up if you don’t already have an account.
- If you already have an account, just log in.

Create a New App:

- Once logged in, navigate to the PubNub Dashboard.
- Click on the "Create New App" button.
- Enter a name for your app and confirm the creation.

Create a Keyset:

- After creating your app, you’ll be prompted to create a new Keyset.
- Enter a name for your Keyset and create it.
- You’ll be provided with a Publish Key and a Subscribe Key. Note these down.


After creating your keys, create (if not already created) an ```.env``` file and set the keys as such
```
REACT_APP_SUBSCRIBE_KEY={enter your subscribe key here}
REACT_APP_PUBLISH_KEY={enter your publish key here}
```

## How to use Yellow Bird Chat
- Upon hitting the landing page you will be asked to enter a screen name.
- once you enter and submit a screen name, the page will change with a greeting using your screen name and give you three options
    1. Join a room using a room key
        > if you have a room key please paste it here. Room Keys are obtained from the header of a chat room and start with ```BirdNest-``` and then a string of numbers. eg ```BirdNest-1719606648016```
    2. Create a Room
        > Creating a room will bring you to a page with a blank chat. You may use the room code from the header to share with someone to join the chat. You may leave the chat with the leave session button. If no users are in a chat, a room has ceased to exist.  
        > You may enter text at the bottom. Shift+Enter goes to a new line. Enter key alone will submit text. Send will also send text. And you have the option to use emojis (emojis may need a second to load, be patient!)
    3. Update Name
        > This will bring you back to the landing page in which you can change your name.


# TESTS
To run unit tests, open console and enter the following command:
```npm test```
or for more specific tests, choose a test file like so:
```npm test -- ChatRoom.test.tsx```

# So what all did I do?
- Created a landing page for creating a screen name
- Created a Join / Create session page with the ability to either join a chat room in session or create a new one. Also has the option to go back create a screen name
- Created a Chat Room page to chat back and forth with
    1. Incorporates Pubnub to create chat rooms, fetch message history, and send messages
    2. Uses Emoji Picker to allow use of emojis in chat and select from a library of emojis
    3. Has a header to display room key and the ability to leave session. If no users are in a session the channel is nixed
    4. Small animations on messages as they pop up

- Persistence upon refresh or closed window for the following:
    1. Screen names
    2. room session 
    3. up to 100 messages

- Hit the requirements for the following:
    1. Text balloons for each participant
    2. Support single-line, multi-line (using a modifier like alt+enter or shift+enter), and emojis in the content
    3.  Design should be responsive
    4. Code is in Typescript

- Tests written to cover components, run ```npm test```

### Jupiter's ToDos
- give submit name stuff their own classes
- create a file for interface types
- organize documentation with more markup code