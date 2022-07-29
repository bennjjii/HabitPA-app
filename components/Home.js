import {StyleSheet, Text, View, Platform, Image} from 'react-native';
import React from 'react';
import Deck from './Deck';

import Piles from './Piles';
import Piles2 from './Piles2';
import ToolingPage from './ToolingPage';
import Entypo from 'react-native-vector-icons/Entypo';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddCard from './AddCard';
import colours from '../assets/colours/colours';

import DeckIcon from '../assets/deckXL.png';
import AddCardIcon from '../assets/addcardXL.png';
import ProgressIcon from '../assets/progressXL.png';
import DeckIconDim from '../assets/deckDimmed.png';
import AddCardIconDim from '../assets/addcardDimmed.png';
import ProgressIconDim from '../assets/progressDimmed.png';

Entypo.loadFont();

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        showLabel: false,
        tabBarStyle: [
          Platform.OS === 'android' ? {height: 100} : {},
          {backgroundColor: colours.mainUiBrown},
        ],

        tabBarLabelStyle:
          Platform.OS === 'android'
            ? {
                marginBottom: 15,
              }
            : {},
      }}>
      <Tab.Screen
        name="Deck"
        component={Deck}
        options={{
          headerShown: false,
          // tabBarIcon: () => <Entypo name="documents" size={32} />,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image source={DeckIcon} style={styles.icon} />
            ) : (
              <Image source={DeckIconDim} style={styles.icon} />
            ),
        }}
      />
      <Tab.Screen
        name="Add Card"
        component={AddCard}
        options={{
          headerShown: false,
          // tabBarIcon: () => <Entypo name="hour-glass" size={32} />,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image source={AddCardIcon} style={styles.icon} />
            ) : (
              <Image source={AddCardIconDim} style={styles.icon} />
            ),
        }}
      />
      <Tab.Screen
        name="Piles"
        component={Piles2}
        options={{
          headerShown: false,
          // tabBarIcon: () => <Entypo name="gauge" size={32} />,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image source={ProgressIcon} style={styles.icon} />
            ) : (
              <Image source={ProgressIconDim} style={styles.icon} />
            ),
        }}
      />
      <Tab.Screen
        name="Tooling"
        component={ToolingPage}
        options={{
          headerShown: false,
          tabBarIcon: () => <Entypo name="code" size={32} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  icon: {
    // width: 40,
    // height: 40,
    // resizeMode: 'stretch',
  },
});
