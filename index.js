/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as AuthProvider} from './services/Auth';
import 'react-native-gesture-handler';
import {Bugfender, LogLevel} from '@bugfender/rn-bugfender';
Bugfender.init({
  appKey: 'yP8BkuIROGvMqT0cnsfWKgA24Y6V4FIE',
  // apiURL: 'https://api.bugfender.com',
  // baseURL: 'https://dashboard.bugfender.com',
  // overrideConsoleMethods: true,
  // printToConsole: true,
  // logUIEvents: true,
  // registerErrorHandler: true,
  // deviceName: 'Anonymous',
  // maximumLocalStorageSize: 5 * 1024 * 1024, // Native specific
  // enableLogcatLogging: false, // Android specific
  // logBrowserEvents: true, // Web specific
  // build: '42', // Web specific
  // version: '1.0', // Web sprecific
});

Bugfender.log('Works');

const Root = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => Root);
