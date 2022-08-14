import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
//import {TouchableOpacity} from 'react-native-gesture-handler';

import colours from '../assets/colours/colours';
import {useStore} from '../services/zustandContext';

const cardAspect = 400 / 280;
const cardWidth = Dimensions.get('window').width / 2 - 30;
const cardHeight = cardWidth * cardAspect;

const ToolingPage = () => {
  const {
    deck,
    getFilteredDeck,
    modalVisiblePiles,
    hideModalPiles,
    logHistory,
    logDeck,
    logFilteredDeck,
    logCardUnderInspection,
    resetTutorialStep,
  } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrView}>
        <Text style={{fontFamily: 'PublicPixel'}}>Full deck:{'\n'}</Text>
        {deck.map(card => {
          return <Text key={card.uuid}>{card.name}</Text>;
        })}
        <Text>
          {'\n'}Filtered deck:{'\n'}
        </Text>
        {getFilteredDeck().map(card => {
          return <Text key={card.uuid}>{card.name}</Text>;
        })}

        <Button
          onPress={() => {
            useStore.persist.clearStorage();
          }}>
          Clear storage
        </Button>
        <Button onPress={logHistory}>log History</Button>
        <Button onPress={logDeck}>log Deck</Button>
        <Button onPress={logFilteredDeck}>log Filtered Deck</Button>
        <Button onPress={logCardUnderInspection}>
          log Card Under Inspection
        </Button>
        <Button onPress={resetTutorialStep}>Reset tutorial</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ToolingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    margin: 20,
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
});
