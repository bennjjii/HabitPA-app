import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Deck from './Deck';
import FreeTimeScreen from './FreeTimeScreen';
import Piles from './Piles';
import Entypo from 'react-native-vector-icons/Entypo';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddCard from './AddCard';

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
        component={Deck}
        options={{
          headerShown: false,
          tabBarIcon: () => <Entypo name="documents" size={32} />,
        }}
      />
      <Tab.Screen
        name="Add Card"
        component={AddCard}
        options={{
          headerShown: false,
          tabBarIcon: () => <Entypo name="hour-glass" size={32} />,
        }}
      />
      <Tab.Screen
        name="Piles"
        component={Piles}
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
