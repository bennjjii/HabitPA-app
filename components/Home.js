import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PossibleActivitiesScreen from './PossibleActivitiesScreen';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tab1"
        component={PossibleActivitiesScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Tab2" component={Tab2} options={{headerShown: false}} />
      <Tab.Screen name="Tab3" component={Tab3} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
