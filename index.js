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
if (global.enableLogging) {
  Bugfender.init({
    appKey: 'yP8BkuIROGvMqT0cnsfWKgA24Y6V4FIE',
  });
}

const Root = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => Root);
