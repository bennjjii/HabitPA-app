import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');

import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();

const BackOfCard = props => {
  return (
    <View style={[props.style, styles.container]}>
      <Text style={styles.cardText}>{'Done!'}</Text>
    </View>
  );
};

export default BackOfCard;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#00EE00',
  },
  cardText: {
    transform: [
      {
        translateX: 10,
      },
    ],
    fontFamily: 'PublicPixel',
    fontSize: 60,
    color: '#00EE00',
  },
});
