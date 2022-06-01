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
//import {TouchableOpacity} from 'react-native-gesture-handler';

import colours from '../assets/colours/colours';
import {useStore} from '../services/zustandContext';

const cardAspect = 400 / 280;
const cardWidth = Dimensions.get('window').width / 2 - 30;
const cardHeight = cardWidth * cardAspect;

const ToolingPage = () => {
  const {deck, getFilteredDeck, modalVisiblePiles, hideModalPiles} = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrView}>
        {deck.map(card => {
          return <Text key={card.uuid}>{card.name}</Text>;
        })}
        <Text>...</Text>

        <Text>...</Text>
        {getFilteredDeck().map(card => {
          return <Text key={card.uuid}>{card.name}</Text>;
        })}
        <TouchableOpacity
          style={{width: 100, height: 50, backgroundColor: 'orange'}}
          onPress={() => {
            console.log('first');
            useStore.persist.clearStorage();
          }}
        />
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
