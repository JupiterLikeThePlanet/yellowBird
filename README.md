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
- Ensure to configure PubNub Keys before deploying the app (see the pubnub setup section)

- git clone <URL_OF_REPOSITORY>
- ensure node and npm are installed and up to date.  Check in terminal using 'node -v' and 'npm -v" respectively.  If neither is installed or is out of date run:
```
sudo apt-get install nodejs
npm install npm@latest || npm install -g npm@latest  
```  

Otherwise in console, please first run 
```
npm install
```

Then run
```
npm start
```

### pubnub setup 
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


# TESTS
To run unit tests, open console and enter the following command:
```npm test```
or for more specific tests, choose a test file like so:
```npm test -- ChatRoom.test.tsx```

### ToDos
- give submit name stuff their own classes
- create a file for interface types
- documentation
