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
import Modal from 'react-native-modal';
import {useNavigationState} from '@react-navigation/native';

import colours from '../assets/colours/colours';
// import AppBackground from './../assets/ElvinWood.jpeg';
import AppBackground from './../assets/pixelBgLic1.png';
import {
  usePersistentStore,
  useNonPersistentStore,
} from '../services/zustandContext';
import BackOfCard from './BackOfCard';
import AddOrEditCardForm from './AddOrEditCardForm';
import InAction from './InAction';

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

const Piles = () => {
  const navState = useNavigationState(state => state.index);
  console.log('NavstatePiles', navState);
  // const renderCounterPiles = useRef(0);
  // useEffect(() => {
  //   renderCounterPiles.current = renderCounterPiles.current + 1;
  // });
  // console.log('Piles', renderCounterPiles);
  const {
    deck,
  } = usePersistentStore();
  const {
    modalVisibleAddCard,
    modalVisibleInAction,
    hideModalAddCard,
  } = useNonPersistentStore();
  const [pileType, setPileType] = useState(undefined);

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
          {deck.map(card => {
            return <BackOfCard card={card} key={`backOfCard${card.uuid}`} />;
          })}
        </ScrollView>

        <Modal
          isVisible={modalVisibleAddCard && navState == 2}
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
            <AddOrEditCardForm sourceTab="Piles" />
          </KeyboardAvoidingView>
        </Modal>
        <Modal isVisible={modalVisibleInAction && navState == 2}>
          <InAction />
        </Modal>
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
