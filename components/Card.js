import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useRef, useEffect, memo} from 'react';
import colours from '../assets/colours/colours';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardBackgroundImg from './../assets/Sprite-0001.png';
const {width, height} = Dimensions.get('window');
FontAwesome.loadFont();

const Card = props => {
  return (
    <ImageBackground source={CardBackgroundImg} style={styles.container}>
      <Text style={styles.cardText}>
        {props.name?.toString() || 'card name here'}
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    width: width * 0.72,
    height: (width * 0.72) / 0.7,
    // backgroundColor: '#222222',
    // backgroundColor: colours.foreground,
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
    // top: 0,
  },
  cardText: {
    width: width * 0.5,
    fontFamily: 'PublicPixel',
    textAlign: 'center',
    color: '#dbb760',
  },
});

export default memo(Card);
