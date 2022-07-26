import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import {Button, Text} from 'react-native-paper';
const {width, height} = Dimensions.get('window');
import colours from '../assets/colours/colours';
import {useStore} from '../services/zustandContext';
import Card from './CardClass';
import chroma from 'chroma-js';

const InAction = props => {
  const {pushCardToHistory, hideModalInAction, cardInAction} = useStore();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            Card.cardDefinitions[cardInAction?.code]?.backOfCardColour,
        },
      ]}>
      <Text style={styles.letsGoText}>Let's Go!</Text>
      <Text style={styles.cardNameText}>{cardInAction?.name}</Text>
      <View styles={styles.buttonsView}>
        <Button
          onPress={() => {
            pushCardToHistory(cardInAction);
            hideModalInAction();
          }}
          labelStyle={styles.completeButton}>
          Complete!
        </Button>

        <Button
          onPress={() => {
            // props.onCancel();
            hideModalInAction();
            console.log('action cancelled');
          }}
          style={{marginTop: 20}}
          labelStyle={[
            styles.cancelButton,
            Card.cardDefinitions[cardInAction?.code]?.backOfCardColour
              ? {
                  color: chroma(
                    Card.cardDefinitions[cardInAction?.code]?.backOfCardColour,
                  )
                    .darken(0.5)
                    .hex(),
                }
              : {},
          ]}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default InAction;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: (40 / 28) * (width * 0.9),
    backgroundColor: '#222222',
    backgroundColor: colours.foreground,
    justifyContent: 'space-between',
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
  },
  letsGoText: {
    color: 'white',
    fontFamily: 'PublicPixel',
    fontSize: 30,
  },
  cardText: {
    color: '#ffffff',
    color: colours.text,
  },
  cardNameText: {
    fontSize: 30,
    color: colours.pixelTextFg1,
    fontFamily: 'PublicPixel',
  },
  completeButton: {
    fontFamily: 'PublicPixel',
    fontSize: 20,
  },
  cancelButton: {
    fontFamily: 'PublicPixel',
  },
});
