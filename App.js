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

import React, {useEffect} from 'react';
import {StyleSheet, Text, Image, View, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {usePersistentStore} from './services/zustandContext';
import Home from './components/Home';
import OnboardingScreen from './components/OnboardingScreen';
import colours from './assets/colours/colours';
import Icon from './assets/appiconoriginal.png';

const Stack = createNativeStackNavigator();

const Header = props => {
  return (
    <>
      {Platform.OS === 'ios' && (
        <View
          style={{
            backgroundColor: colours.mainUiBrown,
            height: 40,
          }}></View>
      )}
      <View
        style={{
          backgroundColor: colours.mainUiBrown,
          height: 55,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontFamily: 'PublicPixel',
            fontSize: 19,
            color: colours.pixelTextFg1,
          }}>
          HabitMage
        </Text>
        <Image source={Icon} />
      </View>
    </>
  );
};

const App = () => {
  const {deck} = usePersistentStore();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <View style={styles.floatingContainer} /> */}

      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: true}}>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              header: Header,
              headerStyle: {
                backgroundColor: colours.mainUiBrown,
              },
              headerTitleStyle: {
                fontFamily: 'PublicPixel',
                color: colours.pixelTextFg1,
              },
            }}
          />
          <Stack.Screen
            name="HabitMage"
            component={Home}
            options={{
              header: Header,
              headerStyle: {
                backgroundColor: colours.mainUiBrown,
              },
              headerTitleStyle: {
                fontFamily: 'PublicPixel',
                color: colours.pixelTextFg1,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    top: 130,
    left: 20,
    width: 200,
    height: 200,
    backgroundColor: 'red',
    zIndex: 1,
  },
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
