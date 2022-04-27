import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import colours from '../assets/colours/colours';
import cardDefinitions from '../assets/data/cardDefinitions';
import AddCardForm from './AddCardForm';

import {useStore} from '../services/zustandContext';

const cardAspect = 400 / 280;
const cardWidth = Dimensions.get('window').width / 2 - 30;
const cardHeight = cardWidth * cardAspect;

const TemplateCard = props => {
  const {showModalAddCard} = useStore();
  return (
    <Pressable
      onPress={() => {
        showModalAddCard(props.code);
      }}>
      <View style={styles.templateCard}>
        <Text style={styles.cardText}>{props.name}</Text>
      </View>
    </Pressable>
  );
};

const AddCard = () => {
  const {modalVisibleAddCard, hideModalAddCard} = useStore();
  //console.log(Object.keys(cardDefinitions));
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrView}>
        <View style={styles.cardFlexContainer}>
          {Object.keys(cardDefinitions).map((card, i) => {
            //console.log(cardDefinitions[card].code + '\n');
            return (
              <TemplateCard
                name={cardDefinitions[card].name}
                key={cardDefinitions[card].code}
                code={cardDefinitions[card].code}
              />
            );
          })}
        </View>
      </ScrollView>
      <Modal
        isVisible={modalVisibleAddCard}
        style={styles.modal}
        onRequestClose={() => {
          hideModalAddCard();
        }}
        onBackdropPress={() => {
          hideModalAddCard();
        }}>
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === 'android' ? undefined : 'position'}>
          <AddCardForm />
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrView: {
    flex: 1,
  },
  cardFlexContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  templateCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: cardWidth,
    height: cardHeight,
    margin: 10,
    borderRadius: 10,
    backgroundColor: colours.foreground,
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
    color: colours.text,
  },
});
