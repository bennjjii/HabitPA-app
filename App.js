/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 **/
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  `Modal with 'formSheet' presentation style and 'transparent' value is not supported.`,
]);

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000',
  cache: new InMemoryCache(),
});

import React, {useContext, useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {useStore} from './services/zustandContext';
import {Context as AuthContext} from './services/Auth';
// import {
//   getConnection,
//   createTables,
//   listTables,
//   uploadTestCards,
//   listCards,
// } from './services/SQLite';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

import colours from './assets/colours/colours';

const Stack = createNativeStackNavigator();

const App = () => {
  //const contextListener = useStore.subscribe(console.log);
  const {deck} = useStore();
  // const dbCallback = useCallback(async () => {
  //   try {
  //     const db = await getConnection();
  //     await createTables(db);
  //     await uploadTestCards(db, deck);
  //     const tables = await listTables(db);
  //     const cards = await listCards(db);
  //     //console.log(cards[0].rows.raw());
  //     // console.log(
  //     //   JSON.parse(decodeURIComponent(cards[0].rows.raw()[0].parameters)),
  //     // );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const {state} = useContext(AuthContext);

  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen
              name="HabitMage"
              component={Home}
              options={{
                title: 'HabitMage🧙',
                headerStyle: {
                  backgroundColor: colours.mainUiBrown,
                },
                headerTitleStyle: {
                  fontFamily: 'PublicPixel',
                  color: colours.pixelTextFg1,
                },
              }}
            />
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
