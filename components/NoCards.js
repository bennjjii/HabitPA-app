import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 1.27,
    elevation: 20,
  },
});

export default NoCards;
