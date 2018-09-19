# TranslateAndLearn

## Motivation

Translate&Learn is an app that should help you to improve your language skills. I often use a translation app to quickly look up some words. In that moment, I know the new word and probably use it once or twice, but time flys, my brain is like a filter and only a few words stay in my mind. I want to beat my forgetability by reading the translations over and over again somewhere in the future. Therefore I need an app that saves the translations and reminds me to read and use new words.

## Implementation

For the implementation I used a cross-platform framework called React Native. The main reasons to use it is my lack of experience in Android (Java, Kotlin) development and the project time. The next section covers my entire development setup from the editor to the third party frameworks I used.

### Environment

As an editor I used **Visual Studio Code**.
The command `react-native info` gives me this information:

```
  React Native Environment Info:
    System:
      OS: macOS High Sierra 10.13.6
      CPU: x64 Intel(R) Core(TM) i7-4980HQ CPU @ 2.80GHz
      Memory: 2.72 GB / 16.00 GB
      Shell: 3.2.57 - /bin/bash
    Binaries:
      Node: 9.8.0 - ~/.nvm/versions/node/v10.9.0/bin/node
      Yarn: 1.3.2 - ~/.yarn/bin/yarn
      npm: 6.2.0 - ~/.nvm/versions/node/v10.9.0/bin/npm
      Watchman: 4.7.0 - /usr/local/bin/watchman
    SDKs:
      iOS SDK:
        Platforms: iOS 12.0, macOS 10.14, tvOS 12.0, watchOS 5.0
      Android SDK:
        Build Tools: 23.0.1, 23.0.2, 25.0.0, 25.0.1, 25.0.2, 25.0.3, 26.0.1, 26.0.2, 26.0.3, 27.0.3, 28.0.0
        API Levels: 16, 21, 23, 25, 26, 27, 28
    IDEs:
      Android Studio: 3.1 AI-173.4819257
      Xcode: 10.0/10A255 - /usr/bin/xcodebuild
    npmPackages:
      react: 16.4.1 => 16.4.1
      react-native: 0.56.0 => 0.56.0
```

As you can see I used React Native version `0.56.0`.

I also designed the UI/UX by myself. Therefore I registered `Sketch` for a trial periode. Some small things like icons and other UI elements I usually use `Affinity Designer`.

### Node packages

If you want to have a closer look at the specific versions of the packages, please have a look at the package.json (and maybe package-lock.json).

This is the list of frameworks that make it happen to realize this project in such short amount of time:

- **Axios**: Easy network request handling
- **Lodash**: Utility framework
- **React Native Elements**: Set of UI components
- **React** Navigation: Javascript based navigation framework
- **Realm**: Persistence of app data
- **Redux**: Handling application state globally
- **Redux Thunk**: Redux middleware to do async tasks in actions / actions creators
- **Eslint & eslint airbnb config**: Lint javascript code by using the airbnb config as a base.

### Features

The main feature is to translate from A to B. To achieve this I used the `Google Cloud Translation API` which is free to use in the first year, like almost all APIs provided by Google. To keep the app working even after this first free of charge year I added the service of `Yandex`. Yandex provides a translation API too. It does come with less languages, but in general it's really useful to get started in the first place. So, big recommendation from myside as this service is for free. Usually the Google Cloud Translation is used to translate the text, but if it is not working for some reason, Yandex is used as a fallback.

Another feature is the persistent history of all translations. Automatically after every successful translation call the app stores the translation and its metadata in a separated history. This history can be accessed by pressing the right hand button on the bottom tabbar.

### Screenshots

To get a overview of the app and how it works I did some fancy App Store like screenshots:

#### iOS

![alt text][ios1]
![alt text][ios2]
![alt text][ios3]
![alt text][ios4]
![alt text][ios5]

#### Android

![alt text][android1]
![alt text][android2]
![alt text][android3]
![alt text][android4]
![alt text][android5]

### Animation

I played around with `React Natives Animated` component which can be seen in the following gif (the higher quality video is located in the screenshots folder):
![alt text][gif]

[ios1]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/ios/translatelearn_1.0_iOS/5.5-inch%20(iPhone%206%2B)%20-%20Screenshot%201.png "Start Screen" width="100"
[ios2]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/ios/translatelearn_1.0_iOS/5.5-inch%20(iPhone%206%2B)%20-%20Screenshot%202.png "Language Choose"
[ios3]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/ios/translatelearn_1.0_iOS/5.5-inch%20(iPhone%206%2B)%20-%20Screenshot%203.png "Switch Language"
[ios4]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/ios/translatelearn_1.0_iOS/5.5-inch%20(iPhone%206%2B)%20-%20Screenshot%204.png "History"
[ios5]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/ios/translatelearn_1.0_iOS/5.5-inch%20(iPhone%206%2B)%20-%20Screenshot%205.png "Detail Screen"
[android1]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/android/translatelearn_1.0_Android/Nexus%206P%20-%20Screenshot%201.png "Start Screen"
[android2]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/android/translatelearn_1.0_Android/Nexus%206P%20-%20Screenshot%202.png "Language Choose"
[android3]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/android/translatelearn_1.0_Android/Nexus%206P%20-%20Screenshot%203.png "Switch Language"
[android4]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/android/translatelearn_1.0_Android/Nexus%206P%20-%20Screenshot%204.png "History"
[android5]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/android/translatelearn_1.0_Android/Nexus%206P%20-%20Screenshot%205.png "Detail Screen"
[gif]: https://github.com/papsti7/TranslateAndLearn/blob/develop/Screenshots/TranslateAndLearn.gif "Animation Example"
