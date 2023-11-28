# MOFVis

## Introduction

'MOFVis,' is a specialized web application designed to transform MOF research by providing unique and interactive visualizations that connect structural information to functional properties and simplify the exploration of MOF structures, fostering deeper insights and accelerating the pace of MOF-related discoveries.

## Team Members

- Venkata Sesha Phani, Vakicherla
- Srikanth Kyatham
- Sri Sai Kiran Reddy Gorla

## Repository details

This project frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Backed is bootstrapped with a Conda Flask server.

## Prerequisites

- Conda installed: You need to have Conda installed on your system.
- Python: Your Conda environment should have Python installed.

## Backend Server Setup

### 1) Go to backend directory

`cd backend`

### 2) if you need to create a Conda environment

`conda create --name my-env`

### 3) if you need to activate a Conda environment

`conda activate my-env`

`conda install --file requirements.txt`

### 4) start backend server in port 5000

`flask --app api run`

## Frontend Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Credits

- https://github.com/facebook/create-react-app
- https://github.com/schrodinger/pymol-open-source
- https://flask.palletsprojects.com/en/3.0.x/
- https://threejs.org/examples/webgl_loader_pdb
- https://anaconda.org/anaconda/conda
