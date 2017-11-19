<h1 align="center">Heart Failure Application</h1>

<div align="center">
  <a href="https://dribbble.com/shots/3831443-Tech-Interview-Handbook">
    <img src="https://github.com/NaseebullahSafi/HeartFailure/blob/master/App/Images/Icons/heartIconREADME.jpg" alt="Tech Interview Handbook" width="400"/>
  </a>
</div>

<p align="center">
  <img src="https://github.com/NaseebullahSafi/HeartFailure/blob/master/App/Images/Icons/heartIconREADME.jpg?raw=true" width="100%" alt="Sublime's custom image"/>
</p>

#  HeartFailure
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)


#### Folder Structure
```
HeartFailure
├── App                            // Compiled files (alternatively `dist`)
│   ├── Components                 // "Dumb" components are stored here. All data is passed into dumb components.
│   │   ├── Styles                 // Use this folder to create and store style files that match the naming of your components
│   ├── Config                     // All application specific configuration falls in this folder
│   ├── Containers                 // A container is what they call a "Smart Component" in Redux. It is a component which knows about Redux.
│   │   ├── Styles                 // This /Containers/Styles folder will house your container styles.
│   ├── Fixtures                   // All key API responses are housed here.
│   ├── Images                     // Static images used in your project are stored here.
│   ├── Lib                        // treat this as proving ground for components that could be reusable outside your project.
│   ├── Navigation                 // This folder will house new navigations.
│   ├── Redux                      // A place to store your Redux files (reducers, stores, etc.).
│   ├── Sagas                      // A place to store your Sagas (Redux side effects).
│   ├── Services                   // API calls to external services.
│   ├── Themes                     // A place to contain styles shared across your project (fonts, colors, etc.).
│   └── Transforms                 // working with APIs is to change data so that it plays nice between your app and the API.
├── README.md
├── __tests__
│   ├── index.android.js
│   └── index.ios.js
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   ├── ignite.json
│   └── plugins
├── index.android.js
├── index.ios.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
└── package.json
```

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started:
1. Copy .env.example to .env
2. Add your config variables
3. Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. Done!
