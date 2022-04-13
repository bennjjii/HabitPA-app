import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colours from '../assets/colours/colours';

const NoCards = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardText}>Add a card to get started!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 400,
    backgroundColor: '#222222',
    backgroundColor: colours.foreground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  cardText: {
    color: '#ffffff',
    color: colours.text,
  },
});

export default NoCards;
