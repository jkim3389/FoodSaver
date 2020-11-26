# FoodSaver 1.0.0

[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github.com/alexhan46/studyfind-ai-web-crawler/)
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

The FoodSaver team is developing a solution for helping people to reduce food waste in their homes. The team identified food spoilage as a significant source of waste and created an application to facilitate food inventory and expiration date tracking.

Coded in Javascript and React-Native.

## Release Notes
> ## v1.0.0 (26/11/2020)
>
> #### New Features
>
> - Add multiple items at the same time by image recognition
> - Add item to my fridge manually
> - Recipe Recommendation
> - Push Notification of expiring item
> - Login feature
> - Setting for predefined expiration date
>
> #### Unsolved Issues
>
> - Android Font Issues
## Installation Guide

### Requirements

- Expo CLI

```shell
$ npm install -g expo-cli
```

- NodeJS

### Installation

#### Clone

> Clone this repo to your local machine using

```shell
$ git clone https://github.com/jkim3389/FoodSaver.git
```

#### Setup

> now install npm dependencies

```shell
$ npm install
```

#### Run

To run the app in simulator, you should have installed XCode or Android Studio to run the simulator.

> run with multiple options(iOS/Android/WebApps)

```shell
$ npm start
```

> run with iOS

```shell
$ npm run ios
```

> run with android

```shell
$ npm run android
```

> run with your device
```
1. Install Expo application on your device.
2. In terminal,  $ npm start 
3. After running expo, scan the QR code using the camera on your device
```

## Known Limitations

- Since our image recognition rely on the Azure Image API, the accuracy of recognizing multiple items in one image is up to Azure support.

## Contributors ✨

Meet our team mates

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/woonglae"><img src="https://avatars1.githubusercontent.com/u/13613663?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Woonglae Cho</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/joheeju"><img src="https://avatars1.githubusercontent.com/u/31485229?s=460&u=3a9ec697656d5171102d81d4fcd1e4dd89a666cd&v=4" width="100px;" alt=""/><br /><sub><b>Heejoo Cho</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/bpooser3"><img src="https://avatars1.githubusercontent.com/u/70162294?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Ben Pooser</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/jkim3389"><img src="https://avatars0.githubusercontent.com/u/45981964?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Juntae Kim</b></sub></a><br /></td>
  </tr>
</table>
