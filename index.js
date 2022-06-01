/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as AuthProvider} from './services/Auth';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';

const Root = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
