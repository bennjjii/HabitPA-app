import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';

import colours from '../assets/colours/colours';
const AppBackground = require('./../assets/pixelBgLic1.png');
import {usePersistentStore} from '../services/zustandContext';
import BackOfCard from './BackOfCard';

//TODO delete this
const piles = [
  'All Cards',
  'Current Hand',
  'Coming up',
  // 'All coming up today',
  // 'All coming up this week',
  'Backburner',
  'Inactive',
];

const {width, height} = Dimensions.get('screen');
const cardAspect = 400 / 280;
const cardWidth = Dimensions.get('window').width / 2 - 50;
const cardHeight = cardWidth * cardAspect;

const Piles = ({doneAnimationRefHome}) => {
  const {deck, history, getFullDeck} = usePersistentStore();

  const [pileComponent, setPileComponent] = useState([
    ...getFullDeck().map(card => {
      return (
        <BackOfCard
          cardInFocus={card}
          key={`backOfCard${card.uuid}`}
          history={history}
          doneAnimationRefHome={doneAnimationRefHome}
        />
      );
    }),
  ]);

  useEffect(() => {
    setPileComponent([
      ...getFullDeck().map(card => {
        return (
          <BackOfCard
            cardInFocus={card}
            key={`backOfCard${card.uuid}`}
            history={history}
            doneAnimationRefHome={doneAnimationRefHome}
          />
        );
      }),
    ]);
  }, [deck, history]);

  return (
    <ImageBackground
      style={styles.cardFlexContainer}
      resizeMode={'cover'}
      source={AppBackground}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.styleBOCScrollview}
          contentContainerStyle={styles.BOCScrollview}>
          <Text>{''}</Text>
          {pileComponent}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Piles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 20,
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
    width: width * 0.42,
    height: (width * 0.42) / 0.7,
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
  flatList: {},
  flatListContent: {
    alignItems: 'center',
  },
  styleBOCScrollview: {
    flex: 1,
  },
  BOCScrollview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
