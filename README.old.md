# yellowbird


## Objective:
Build a real-time, two-way chat application using ReactJS and integrate it with a free account on PubNub.

## Task Details:
To demonstrate your skills around front-end development and integration with 3rd party APIs, you are asked to build a
fake real-time two-way chat between two clients.

## SETUP
Prerequisites
Node.js (v12.x or later)
NPM (v6.x or later)
Ensure you configure the following aspects before deploying the app:
PubNub Keys: Obtain your keys from the PubNub dashboard and set them in your .env file as mentioned above.

- git clone <URL_OF_REPOSITORY>
- ensure node and npm are installed and up to date.  Check in terminal using 'node -v' and 'npm -v" respectively.  If neither is installed or is out of date run:
sudo apt-get install nodejs
npm install npm@latest || npm install -g npm@latest    

- npm install
- npm start


issues with eslint:
npm update eslint-plugin-jest @typescript-eslint/eslint-plugin react-scripts eslint-config-react-app


# TESTS
- Using Jest with `ts-jest` for handling TypeScript
- React Testing Library is used for rendering components in the test environment.

To run unit tests, open console and enter the following command:
```npm test```
or for more specific tests, choose a test file like so:
```npm test -- ChatRoom.test.tsx```

>> problem with files starting with ._

### ToDos
- give submit name stuff their own classes
- create a file for interface types
- documenatation