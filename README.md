# MERNStackBookingPortal

## Technology Stack Used
1. Front End - React.js
2. Backend - Express
3. Server - Node.js
4. Database - MongoDB (Cluster hosted on MongoDB Atlas)
5. Store manager - Redux
6. Authentication methodology - JavaScript Web Tokens (JWT)
7. Testing Library - Jest
8. Deployment - Docker

## Thought process behind tech stack
1. Why React.js?<br /><br />
I went for the React.js library as my front end because of the usability advantage which I have developed over the last 2 years, which is mainly attributed to a lot of work done on MERN stack web apps

2. Why Node.js?<br /><br />
I think the pair of Node.js and React.js (with Express as the backend) is an excellent pair because of the way they complement each other. Both libraries add dependencies using the ``npm`` or the ``yarn`` package manager and the main plus point is the fact that React.js is built out of Node.js

3. Why Redux?<br /><br />
A store manager was the need of the hour especially with a JWT authentication strategy. I needed to handle the authentication token properly to make sure the user can log in securely and in an hassle free manner

4. Why Jest?<br /><br />
I could have easily gone with the default React Testing Library and the decision to go with Jest was a pretty random one. Jest has fantastic documentation for snapshot testing and DOM manipulation tests for React and the choice was irresistable

## How to run this app
1. Assuming you have git cloned the repo to your local machine, install docker and docker-compose on Linux or Mac (I can't vouch for Windows because it has not been tested there). <br /><br />
2. After you have installed docker and docker-compose, from the root folder, run ``docker-compose up --build`` (Linux users might want to run it in ``sudo`` mode to avoid permission errors)<br /><br />
3. Navigate to the IP-Address link using the IP Address which shows up on the console or terminal. You will see something like ``Your Network: http://xx.xx.xx.xx:3000``. Enter "http://xx.xx.xx.xx:3000" in your browser to get the app running <br /><br />
4. Any problems, kindly open a Github issue!

## What is broken
1. Autocomplete on landing page of app is not present. User has to enter a location manually <br /><br />
2. Right now, only 2 more cities can be added in "Multi City" mode on the landing page. The distance has been set to 300 km for all modes (One Way, Round Trip and Multi City) because of the 1st point


