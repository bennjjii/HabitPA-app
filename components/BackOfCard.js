import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {useStore} from '../services/zustandContext';

import ProgressBox from './ProgressBox';

import colours from '../assets/colours/colours';

const {width, height} = Dimensions.get('window');

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
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome
          style={styles.icon}
          name="check"
          size={40}
          onPress={() => {
            switchToInAction(props.card);
            // props.begin();
          }}
        />
        <FontAwesome
          style={styles.icon}
          name="edit"
          size={40}
          onPress={() => {
            console.log('POOPOOO');
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
      <Text style={styles.cardText}>{props.card?.name || '...'}</Text>

      <ProgressBox card={props.card} />
    </View>
  );
};

export default BackOfCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: (40 / 28) * (width * 0.8),
    backgroundColor: '#222222',
    backgroundColor: colours.foreground,
    justifyContent: 'flex-start',
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
    paddingVertical: 30,
    margin: 10,
  },
  cardText: {
    color: '#ffffff',
    color: colours.text,
    fontSize: 30,
    marginBottom: 30,
  },
  //surely put these in a flex container??
  iconContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.6,
    top: width * 0.97,
  },
  icon: {
    color: 'grey',
  },
});
