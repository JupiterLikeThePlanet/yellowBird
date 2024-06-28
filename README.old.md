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




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).