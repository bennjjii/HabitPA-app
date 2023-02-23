import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import colours from '../assets/colours/colours';

const {width, height} = Dimensions.get('window');

const NoCards = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardText}>There's nothing here...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 400,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    width: width * 0.5,
    fontFamily: 'PublicPixel',
    textAlign: 'center',
    color: '#dbb760',
  },
});

export default NoCards;
