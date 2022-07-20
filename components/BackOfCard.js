import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useStore} from '../services/zustandContext';

import ProgressBox from './ProgressBox';

import colours from '../assets/colours/colours';

const {width, height} = Dimensions.get('screen');

import CardBackgroundImg from './../assets/Sprite-0001.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();

const BackOfCard = props => {
  const {
    deleteCardFromDeck,
    cardUnderInspection,
    hideModalBackOfCard,
    switchToEditCard,
    switchToInAction,
  } = useStore();

  return (
    <ImageBackground source={CardBackgroundImg} style={styles.container}>
      <Text style={styles.cardText}>{props.card?.name || '...'}</Text>

      <ProgressBox card={props.card} />
      <View style={styles.iconContainer}>
        <FontAwesome
          style={styles.icon}
          name="check"
          size={40}
          onPress={() => {
            switchToInAction(props.card);
          }}
        />
        <FontAwesome
          style={styles.icon}
          name="edit"
          size={40}
          onPress={() => {
            switchToEditCard(props.card);
          }}
        />
        <FontAwesome
          style={styles.icon}
          name="trash-o"
          size={40}
          onPress={() => {
            deleteCardFromDeck(props.card);
            hideModalBackOfCard();
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default BackOfCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: (width * 0.9) / 0.7,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    padding: 45,
    margin: 10,
  },
  cardText: {
    color: '#ffffff',

    fontSize: 30,
    marginBottom: 30,
    fontFamily: 'PublicPixel',
  },
  //surely put these in a flex container??
  iconContainer: {
    // position: 'absolute',

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.65,
    // top: width * 1.1,
  },
  icon: {
    color: 'grey',
  },
});
