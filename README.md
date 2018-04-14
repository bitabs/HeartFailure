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

###### Folder Structure
``` js
HeartFailure
├── App                      // Main Application logic lies here
│   ├── Components           // "Dumb" components are stored here.
│   │   ├── Styles           // This folder contains the style files that match the naming of our components
│   ├── Config               // All application specific configuration falls in this folder
│   ├── Containers           // "Smart Component" lies here
│   │   ├── Styles           // This folder houses our container styles
│   ├── Fixtures             // All key API responses are housed here (Not used in our proj)
│   ├── Images               // Static images used in our project are stored here
│   ├── Lib                  // Reusable components outside our project
│   ├── Navigation           // Cinfgures our application routing
│   ├── Redux                // A place to store our Redux files (default setup from the scaffolding)
│   ├── Sagas                // A place to store our Sagas (default setup from the scaffolding)
│   ├── Services             // API calls to external services
│   ├── Themes               // A place to contain styles shared across our project (fonts, colors, etc.)
│   └── Transforms           // Working with APIs is to change data so
├── README.md
├── Tests                    // Unit testing directory              
│   ├── Components           // Unit testing of our components
├── android                  // Access point to our android platform
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
├── ios                      // Access point to our IOS platform
│   ├── HeartFailure
│   ├── HeartFailure-tvOS
│   ├── HeartFailure-tvOSTests
│   ├── HeartFailure.xcodeproj
│   └── IgniteProjectTests
└── package.json
```


## External Libraries

Because this project uses Ignite CLI scaffolding, certain libraries have been installed by default, to organise the application and hold the basic structure. However, these libraries are not entirely reliant within our custom react-native components; bu they are still needed by Ignite CLI. For example, the libraries below are installed by the CLI to organise our project.

##### Libraries used by Ignite CLI Scaffolding 

> [`apisauce`](https://github.com/infinitered/apisauce),
> [`convert-string`](https://github.com/vbuterin/bitcoinjs-lib),
> [`metro-bundler`](https://github.com/facebook/metro),
> [`ramda`](https://github.com/ramda/ramda),
> [`ramdasauce`](https://github.com/infinitered/ramdasauce),
> [`react`](https://github.com/facebook/react),
> [`react-native-i18n`](https://github.com/fnando/i18n-js),
> [`react-native-popup-menu`](https://github.com/instea/react-native-popup-menu),
> [`react-redux`](https://github.com/reactjs/react-redux),
> [`redux`](https://github.com/reactjs/redux),
> [`redux-form`](https://github.com/erikras/redux-form),
> [`redux-persist`](https://github.com/rt2zz/redux-persist),
> [`redux-saga`](https://github.com/redux-saga/redux-saga),
> [`reduxsauce`](https://github.com/infinitered/reduxsauce),
> [`seamless-immutable`](https://github.com/rtfeldman/seamless-immutable)

Below are some libraries that are used within our components. Some liraries from below are not integrated to certain components due to incompatibility issues, but can be used if integrated to react-native modules. For example: slayerjs is a node module which cannot be used within react-native.

##### Libraries used within our react-native custom components

> [`react-native`](https://github.com/facebook/react-native),
> [`firebase-mock`](https://github.com/soumak77/firebase-mock),
> [`kalmanjs`](https://github.com/wouterbulten/kalmanjs),
> [`lodash`](https://github.com/lodash/lodash),
> [`moment`](http://momentjs.com/),
> [`prop-types`](https://github.com/facebook/prop-types),
> [`react-native-ble-manager`](https://github.com/innoveit/react-native-ble-manager),
> [`react-native-check-box`](https://github.com/crazycodeboy/react-native-check-box),
> [`react-native-firebase`](https://github.com/invertase/react-native-firebase),
> [`react-native-highcharts`](https://github.com/TradingPal/react-native-highcharts),
> [`react-native-svg`](https://github.com/react-native-community/react-native-svg),
> [`react-native-tab-view`](https://github.com/react-native-community/react-native-tab-view),
> [`react-native-timeago`](https://github.com/TylerLH/react-native-timeago),
> [`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons),
> [`react-navigation`](https://github.com/react-navigation/react-navigation),
> [`slayer`](https://github.com/bbc/slayer)


##### App/Fixture Directory

Within this folder, Ignite has generated some dummy data that is closely coupled with Redux.
We can't remove these data as it breaks the whole application. Our application does not use Fixtures

##### User's images

Dummy images have been taken from google images. Some Images may hold copyright, and some not.

## Credits
 
Lead Developer - Naseebullah Ahmadi (@Naseebullahsafi)
 
## License
 
The MIT License (MIT)

Copyright (c) 2018 Naseebullah Ahmadi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

The software is provided "as is", without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software of the use of other dealings in the software.
