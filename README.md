## CSCI 5709 Grp-05

### Falafellas Learning Hub
- The "Falafellas Learning Hub" is a dynamic platform designed to provide continuous training and support for Falafellas employees, ensuring they are equipped with the knowledge and skills needed to excel in their roles.

Group Project link: [CSCI 5709 Grp-05](https://git.cs.dal.ca/panchamia/csci-5709-grp-05/)
Deployed Link: https://falafellas.netlify.app/ 

## Individiual branch links:

- [Shweta Shweta](https://git.cs.dal.ca/panchamia/csci-5709-grp-05/-/tree/shweta-shweta?ref_type=heads)
- [Aakash Nandwani](https://git.cs.dal.ca/panchamia/csci-5709-grp-05/-/tree/aakash-nandwani?ref_type=heads)
- [Samit Mhatre](https://git.cs.dal.ca/panchamia/csci-5709-grp-05/-/tree/samit-mhatre?ref_type=heads)
- [Krisha Panchamia](https://git.cs.dal.ca/panchamia/csci-5709-grp-05/-/tree/krisha-panchamia?ref_type=heads)
- [Gunjan Vazirani](https://git.cs.dal.ca/panchamia/csci-5709-grp-05/-/tree/gunjan-vazirani?ref_type=heads)
- [Aditya Pattani](https://git.cs.dal.ca/panchamia/csci-5709-grp-05/-/tree/aditya-pattani?ref_type=heads)

## Features

The following are the features of our application

Must Have

- Authentication (Shweta Shweta)
- User Profile & Rewards (Krisha Panchamia)
- Course details (Samit Mhatre)
- Course addition (Aditya Pattani)
- User dashboard (Aakash Nandwani)
- Quiz addition (Gunjan Vazirani)
- Contact Page & FAQ 
- Administrator Reporting
- Quiz Attempt

Nice to have

- Review
- Progress Tracking
- Discussion Channel

## Folder Structure

Our approach of arranging projects into folder structures is intended to improve the efficiency of code administration, maintenance, and reuse. By organizing relevant files into separate directories, we create a modular and integrated codebase. This segmentation enables focused development on individual components or features, resulting in a more agile development process.

In frontend development, using a tiered folder structure makes it easier to organize and access resources such as CSS, JavaScript, pictures, and fonts. This technique promotes a clear separation of different frontend parts, which improves code clarity and facilitates team cooperation.

Furthermore, a properly structured folder architecture promotes code reuse throughout the project. This allows for the smooth integration of reusable components in different portions of the application.

Please find the folder structure below for our frontend application:

```
frontend/
└── falafellas/
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── src/
    │   ├── Components/
    │   │   └── <Folders for different components in the app>
    │   ├── assets/
    │   │   └── <Folders for assets used as per components>
    │   ├── App.js
    │   ├── App.css
    │   ├── common.css
    │   ├── index.css
    │   └── index.js
    └── README.md
```

Please find the folder structure below for our backend application:

```
backend/
├── package.json
├── server.js
└── app/
    ├── controllers/
    │   ├── <JS files for different controllers>
    ├── models/
    │   ├── <JS files for different models>
    ├── routes/
    │   ├── <JS files for different routes>
    └── services/
        ├── <JS files for different services>
```

## Prerequisites

To have this project up and running on your local machine, you will first need to install the following software.

- Node.js(v20.11.0)

See the following section for detailed step-by-step instructions on how to install this software.

## Installing

Download and Install Node.js for your Operating System from https://nodejs.org/en/download.

Check if Node.js is successfully installed by checking it's version on the terminal.

```
node --version
```

Confirm if the version is the same as the one downloaded.

v20.11.0

## Deployment

Install the required dependencies

```
npm i
```

To run the development server use start script

```
npm run
```

To deploy in production environment

```
npm build
```

## Deployment

# Frontend

To deploy our project environment, we utilized Netlify. Here's a summary of the deployment process we followed:

- Setting Up the Netlify Account
- Connecting to Git Repository
- Configuring Build Settings
- Continuous Deployment
- Monitoring and Analytics

# Backend

To deploy our project environment, we utilized Render. Here's a summary of the deployment process we followed:

- Creating a Render Account
- Deploying Backend Services
- Configuring Environment Variables
- Setting Up Continuous Deployment

## Testing

In the context of my application, the end-to-end tests & coding style tests which I went through are described below:

1. Testing Responsiveness

- Test: Resize the browser window to different screen sizes or use a responsive design testing tool to emulate various devices.

- Expectation: Verify that the website layout and components adapt appropriately to different screen sizes, ensuring readability and usability across devices. Elements should resize, reposition, or hide as necessary.

## Built With

- [Node.js](https://nodejs.org/en/download) - To provide the runtime environment and for Dependency Management.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - For installing and managing packages for the React app.
- [React](https://react.dev/learn/installation) - For building the user interface for the app.
- [ReactRouter](https://reactrouter.com/en/main) - Router for react
- [Express](https://expressjs.com/) - Web Framework for NodeJS
- [MongoDB](https://www.mongodb.com/) - Data Storage using NoSQL
- [Mongoose](https://mongoosejs.com/) - Object Modelling for NodeJS

NOTE: We need to have Node.js installed, which includes npm, in order to install and use React and Material-UI in our project.
