import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

import colours from '../assets/colours/colours';

const {width, height} = Dimensions.get('window');

const BackOfCard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardText}>{props.card?.name || '...'}</Text>
    </View>
  );
};

export default BackOfCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: (40 / 28) * (width * 0.9),
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
  icon: {
    position: 'absolute',
    left: 230,
    top: 10,
    color: 'grey',
  },
});
