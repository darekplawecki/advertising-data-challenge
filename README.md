# Simple app for recruitment process

This is a very simple app that retrieves and visualises advertising data. The app was implemented as a technical task 
for recruitment process. As suggested, the project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

### Install

For development, you need [NodeJS](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your environment. It is recommended to
install NodeJS using [Node Version Manager](https://github.com/nvm-sh/nvm).

Once NodeJS is installed, run the following command:

```sh
yarn
```

### Start

```sh
yarn start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Tests

```sh
yarn test
```
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Lint

```sh
yarn lint
```
Runs static code analysis using ESLint.

### Build for production

```sh
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Folder structure

```
src
 ┣━ api
 ┣━ assets
 ┣━ components
 ┃   ┣━ atoms
 ┃   ┃   ┗━ {ComponentName}
 ┃   ┃       ┣━ {ComponentName}.tsx
 ┃   ┃       ┣━ {ComponentName}.test.tsx
 ┃   ┃       ┣━ {ComponentName}.scss
 ┃   ┃       ┣━ {ComponentName}.utils.ts
 ┃   ┃       ┣━ {ComponentName}.utils.test.ts
 ┃   ┃       ┗━ index.tsx
 ┃   ┣━ molecules
 ┃   ┣━ organisms
 ┃   ┗━ templates
 ┣━ hooks
 ┣━ pages
 ┃   ┗━ {PageComponentName}
 ┃       ┣━ components
 ┃       ┣━ types
 ┃       ┣━ utils
 ┃       ┣━ {PageComponentName}.tsx
 ┃       ┣━ {PageComponentName}.test.tsx
 ┃       ┗━ index.tsx
 ┣━ types
 ┗━ utils
```

- `api` is where api clients, graphql queries/mutations etc. should be placed,
- `assets` contains all images, svg, icons etc.,
- `components` are shared components grouped with atomic design pattern. Each component has its own folder. Inside 
the component folder, all the files related to this component should be kept (styles, tests, utils) as well as a 
single root file index.ts,
- `hooks` contains reusable React hooks,
- `pages` is where page components are kept with all their specific files (nested components, types, utils) grouped in 
corresponding folders,
- `types` contains reusable types and interfaces,
- `utils` are helpful functions.

All the mock files should be placed on any level in the `__mock__` folder and all the test builders or test 
helpers - on any level in the `__test__` folder. 

## Naming conventions

Type, class and component names are written in `CamelCase`, starting with capital letter.

Constant names are written in `UPPER_CASE`.

For other variables and other typescript files, `camelCase` is used.

CSS classes are named according to the BEM (Block-Element-Modifier) convention.
