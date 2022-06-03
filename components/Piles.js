import React, {useState, useEffect} from 'react';
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
import BackOfCard from './BackOfCard';

const piles = [
  'All Cards',
  'Current Hand',
  'Coming up',
  'Backburner',
  'Inactive',
];

const cardAspect = 400 / 280;
const cardWidth = Dimensions.get('window').width / 2 - 50;
const cardHeight = cardWidth * cardAspect;

const Pile = props => {
  const {showModalPiles} = useStore();
  return (
    <Pressable
      onPress={() => {
        props.setPileType(props.name);
        showModalPiles();
      }}>
      <View style={styles.templateCard}>
        <Text style={styles.cardText}>{props.name}</Text>
      </View>
    </Pressable>
  );
};

const Piles = () => {
  const {
    deck,
    getFilteredDeck,
    getComingUpDeck,
    modalVisiblePiles,
    hideModalPiles,
  } = useStore();
  const [pileType, setPileType] = useState(undefined);
  const [cardsToRender, setCardsToRender] = useState([]);

  useEffect(() => {
    switch (pileType) {
      case 'All Cards':
        setCardsToRender(deck);
        break;
      case 'Current Hand':
        setCardsToRender(getFilteredDeck());
        break;
      case 'Coming up':
        setCardsToRender(getComingUpDeck());
        break;
      case 'Backburner':
        break;
      case 'Inactive':
        break;
    }
  }, [pileType]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={styles.scrView}> */}
      <View style={styles.cardFlexContainer}>
        {piles.map(pile => {
          return <Pile name={pile} setPileType={setPileType} />;
        })}
      </View>
      {/* </ScrollView> */}
      <Modal
        isVisible={modalVisiblePiles}
        onBackdropPress={() => {
          setPileType(undefined);
          setCardsToRender([]);
          hideModalPiles();
        }}>
        <ScrollView>
          {/* //replace this */}
          <Text>{'\n\n\n\n'}</Text>
          {cardsToRender.map(card => {
            return <BackOfCard card={card} />;
          })}
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default Piles;

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
    justifyContent: 'flex-start',
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
  flatList: {},
  flatListContent: {
    alignItems: 'center',
  },
});
