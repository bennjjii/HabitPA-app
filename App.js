/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 **/

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000',
  cache: new InMemoryCache(),
});

import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Context as AuthContext} from './services/Auth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  const {state} = useContext(AuthContext);
  console.log(state);
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            {state.email ? (
              <Stack.Screen name="Home" component={Home} />
            ) : (
              <Stack.Screen name="SignIn" component={SignIn} />
            )}
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
