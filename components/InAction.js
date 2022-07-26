import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import {Button, Text} from 'react-native-paper';
const {width, height} = Dimensions.get('window');
import colours from '../assets/colours/colours';
import {useStore} from '../services/zustandContext';

const InAction = props => {
  const {pushCardToHistory, hideModalInAction, cardInAction} = useStore();
  return (
    <View style={styles.container}>
      <Text>Let's Go!</Text>
      <Text style={styles.cardNameText}>{cardInAction?.name}</Text>
      <View styles={styles.buttonsView}>
        <Button
          onPress={() => {
            pushCardToHistory(cardInAction);
            hideModalInAction();
          }}>
          Complete
        </Button>

        <Button
          onPress={() => {
            // props.onCancel();
            hideModalInAction();
            console.log('action cancelled');
          }}
          theme={styles.cancelButton}>
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
    paddingVertical: 50,
  },
  cardText: {
    color: '#ffffff',
    color: colours.text,
  },
  cardNameText: {
    fontSize: 30,
  },
  cancelButton: {
    color: 'red',
    fontSize: 10,
  },
});
