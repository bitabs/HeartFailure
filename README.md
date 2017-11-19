<div align="center">
  <a href="https://dribbble.com/shots/3831443-Tech-Interview-Handbook">
    <img src="https://github.com/NaseebullahSafi/HeartFailure/blob/master/App/Images/Icons/heartIconREADME.jpg" alt="Tech Interview Handbook" width="100%"/>
  </a>
</div>

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

###### Project Briefing
> In a normal healthy heart, during each heartbeat a set amount of blood enters the heart and is pumped out 
again. If you have heart failure, your heart cannot cope with pumping the full amount of blood in each 
heartbeat. The incidence of heart failure is increasing. Over half a million people in the UK have been 
diagnosed with heart failure. Heart failure is not a static disease and the patient’s condition might worsen 
rapidly which calls for a rapid treatment response.  

> The most common measure for home monitoring of Heart failure patients is body weight, which relates to the 
patient’s fluid balance. However, the benefits of such systems are limited. Therefore a system, which combines
ECG and heart sounds, is proposed for home monitoring. The advantage of combining ECG and heart sounds is 
that they, in combination, measure both the mechanical and electrophysiological function of the heart in 
real-time. The challenges are many and include design of a system, which is easy and comfortable to use, and 
development of mobile applications for visualization and processing of the signals.

###### Aim
> This project aims at designing a mobile application (App) capable of receiving data from an external device, 
process and visualize for the patient. The project may include setting up a remote server for data storing. At
the end of the project, the student should submit a report. Source codes and hardware are delivered to the 
project proposer. This project can be completed in close collaboration with the student working with project 
ENK01.


###### Folder Structure
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

###### Installation

```
git clone https://github.com/NaseebullahSafi/HeartFailure.git HeartFailure
cd HeartFailure
npm install
```

###### Run Application
```
cd HeartFailure
react-native run-ios        // Run Build for IOS
react-native run-android    // Run Build for Android
```

###### To Lint on Commit

> This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

###### Bypass Lint

> If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

###### Understanding Linting Errors

> The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

###### Secrets

> This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

> and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

> The `.env` file is ignored by git keeping those secrets out of your repo.

###### Get started
1. > Copy .env.example to .env
2. > Add your config variables
3. > Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. > Done!
