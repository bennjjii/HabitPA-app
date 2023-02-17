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

import colours from '../assets/colours/colours';
// import AppBackground from './../assets/ElvinWood.jpeg';
import AppBackground from './../assets/pixelBgLic1.png';

import CardClass from './CardClass';

import {useNonPersistentStore} from '../services/zustandContext';
import chroma from 'chroma-js';

const cardDefinitions = CardClass.cardDefinitions;

const {width, height} = Dimensions.get('screen');

const TemplateCard = props => {
  const {showAddOrEditModal} = useNonPersistentStore();

  return (
    <Pressable
      onPress={() => {
        showAddOrEditModal(props.code);
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
