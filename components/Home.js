import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainDeck from './MainDeck';
import FreeTimeScreen from './FreeTimeScreen';
import Tab3 from './Tab3';
import Entypo from 'react-native-vector-icons/Entypo';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

Entypo.loadFont();

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="Deck"
        component={MainDeck}
        options={{
          headerShown: false,
          tabBarIcon: () => <Entypo name="documents" size={32} />,
        }}
      />
      <Tab.Screen
        name="Free Time"
        component={FreeTimeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Entypo name="hour-glass" size={32} />,
        }}
      />
      <Tab.Screen
        name="Tab3"
        component={Tab3}
        options={{
          headerShown: false,
          tabBarIcon: () => <Entypo name="gauge" size={32} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
