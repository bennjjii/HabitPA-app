import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigationState} from '@react-navigation/native';

import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import colours from '../assets/colours/colours';
// import AppBackground from './../assets/ElvinWood.jpeg';
import AppBackground from './../assets/pixelBgLic1.jpg';

import AddOrEditCardForm from './AddOrEditCardForm';
import CardClass from './CardClass';

import {useNonPersistentStore} from '../services/zustandContext';
import chroma from 'chroma-js';

const cardDefinitions = CardClass.cardDefinitions;

const {width, height} = Dimensions.get('screen');

const TemplateCard = props => {
  const {showModalAddCard} = useNonPersistentStore();

  return (
    <Pressable
      onPress={() => {
        showModalAddCard(props.code);
      }}>
      <View
        style={[
          styles.templateCard,
          {backgroundColor: props.backgroundColour},
        ]}>
        <Text
          style={[
            styles.cardText,
            {
              color: props.foregroundColour,
            },
          ]}>
          {props.name}
        </Text>
      </View>
    </Pressable>
  );
};

const AddCard = () => {
  const navState = useNavigationState(state => state.index);
  console.log('NavstateAdd', navState);
  const {modalVisibleAddCard, hideModalAddCard} = useNonPersistentStore();
  // const renderCounterAddCard = useRef(0);
  // useEffect(() => {
  //   renderCounterAddCard.current = renderCounterAddCard.current + 1;
  // });
  // console.log('AddCard', renderCounterAddCard);
  //console.log(Object.keys(cardDefinitions));
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground resizeMode={'cover'} source={AppBackground}>
        <ScrollView style={styles.scrView}>
          <View style={styles.cardFlexContainer}>
            {Object.keys(cardDefinitions).map((card, i) => {
              return (
                <TemplateCard
                  name={cardDefinitions[card].name}
                  key={cardDefinitions[card].code}
                  code={cardDefinitions[card].code}
                  backgroundColour={cardDefinitions[card].backOfCardColour}
                  foregroundColour={
                    chroma(cardDefinitions[card].backOfCardColour).get(
                      'lab.l',
                    ) < 70
                      ? colours.pixelTextFg1
                      : colours.pixelTextFg2
                  }
                />
              );
            })}
          </View>
        </ScrollView>
      </ImageBackground>
      <Modal
        isVisible={modalVisibleAddCard && navState == 1}
        style={styles.modal}
        onRequestClose={() => {
          hideModalAddCard();
        }}
        onBackdropPress={() => {
          hideModalAddCard();
        }}
        presentationStyle={'formSheet'}
        transparent={true}>
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === 'android' ? undefined : 'position'}>
          <AddOrEditCardForm sourceTab="AddCard" />
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrView: {
    // flex: 1,
  },
  cardFlexContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    // padding: 10,
  },
  templateCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.42,
    height: (width * 0.42) / 0.7,
    margin: 10,
    padding: 10,
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
    fontFamily: 'PublicPixel',
  },
});
