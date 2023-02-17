import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');

import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();

const Done = props => {
  return <Text style={styles.cardText}>{'Done!'}</Text>;
};

export default Done;

const styles = StyleSheet.create({
  cardText: {
    fontFamily: 'PublicPixel',
    fontSize: 60,
    color: '#00EE00',
  },
});
