//Main deck
/*
You get a deck of cards for the day, which is based 
on the input habits, the habit time functions, and the recorded completed habits
The idea is that it is a system which gradually keeps you on track with progress while
still being flexible, understanding that you might not want to do something one day
It should also have a back burner pile which is things you want to do in the future but don't want to overburden yourself with
Then it should have tasks which are like, this just needs to get done at some point like taxes etc
Is it a morning thing, evening thing, etc
It is a bit like agile where you have a backlog and a sprint
And the main deck is like your sprint for the day, 
So the app's job is to decide what cards are in your hand at any given time
Answers the question - what should I do right now
There will be logic which decides which cards are shown to you right now
Question is - put this logic on the frontend or the backend??
Sub decks
RxW
RxM
Will need some kind of stable random seed for long term randomisation
need persist option for a card to persist once drawn
*/

import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Pressable,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
//
import colours from '../assets/colours/colours';
import {Context as AuthContext} from '../services/Auth';
import Card from './Card';
import NoCards from './NoCards';
import BackOfCard from './BackOfCard';
import InAction from './InAction';
import AddOrEditCardForm from './AddOrEditCardForm';
import CustomCheckbox from './CustomCheckBox';
import {useQuery, gql} from '@apollo/client';
import AppBackground from './../assets/ElvinWood.jpeg';

import {useStore} from '../services/zustandContext';
import {Button} from 'react-native-paper';

// import {
//   getConnection,
//   syncGetConnection,
//   addHistoryInstance,
//   listCards,
// } from '../services/SQLite';

const {width, height} = Dimensions.get('screen');
//const toRadians = angle => angle * (Math.PI / 180);
// const rotatedWidth =
//   width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));
// const xOffset = (width * 0.72) / 2;
const xOffset = 0;
const yOffset = (width * 0.72) / 1.4;
// const yOffset = 0;

const Deck = () => {
  console.log(
    'Dims',
    Dimensions.get('window').height,
    Dimensions.get('screen').height,
    height,
  );

  const {
    deck,
    history,
    deleteCardFromDeck,
    getFilteredDeck,
    modalVisibleBackOfCard,
    cardUnderInspection,
    showModalBackOfCard,
    hideModalBackOfCard,
    modalVisibleInAction,
    switchToInAction,
    modalVisibleAddCard,
    hideModalAddCard,
  } = useStore();
  const {state, signout} = useContext(AuthContext);
  const [cardInAction, setCardInAction] = useState(undefined);
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(1);
  const translationX = useSharedValue(0 - xOffset);
  const translationY = useSharedValue(0 - yOffset);
  const currentCard = useSharedValue(0);
  const tempCurrentCard = useSharedValue(0);
  let [filteredDeck, setFilteredDeck] = useState(getFilteredDeck());

  const startCardInAction = async args => {
    console.log('card sent to history', filteredDeck[args[0]]);
    console.log('card index', args[0]);
    setCardInAction(filteredDeck[args[0]]);
    switchToInAction(filteredDeck[args[0]], true);
  };

  const resetCardPosn = () => {
    setTimeout(() => {
      translationX.value = -xOffset;
      translationY.value = -yOffset;
    }, 50);
  };

  const updateCardIndex = args => {
    // if (currentCard.value + 1 < filteredDeck.length) {
    //   currentCard.value = currentCard.value + 1;
    // } else {
    //   currentCard.value = 0;
    // }
    setIndex(args);
    setTimeout(() => {
      setIndex2(filteredDeck.length > args + 1 ? args + 1 : 0);
    }, 100);
  };

  const deleteCard = () => {
    console.log('card deleted');
    deleteCardFromDeck(filteredDeck[index]);
    currentCard.value = 0;
  };

  useEffect(() => {
    console.log('updating deck cos history changed');
    setFilteredDeck(getFilteredDeck());
  }, [history]);

  useEffect(() => {
    console.log('updating deck cos deck changed');
    setFilteredDeck(getFilteredDeck());
  }, [deck]);

  useEffect(() => {
    console.log('Card under inspection', cardUnderInspection);
    console.log('Logged deck', deck[2]);
  }, [cardUnderInspection]);

  const manualUpdate = () => {
    console.log('manual update');
    setFilteredDeck(getFilteredDeck());
  };

  // const deckSub = useStore.subscribe(manualUpdate);
  const gesture = Gesture.Pan()
    .onUpdate(event => {
      translationX.value = event.translationX - xOffset;
      translationY.value = event.translationY - yOffset;
    })
    .onEnd(event => {
      switch (true) {
        case event.velocityX < -2500:
          translationX.value = withSpring(
            -1000,
            {overshootClamping: true},
            () => {
              if (filteredDeck.length) {
                tempCurrentCard.value = currentCard.value;
                if (currentCard.value + 1 < filteredDeck.length) {
                  currentCard.value = currentCard.value + 1;
                } else {
                  currentCard.value = 0;
                }
                runOnJS(updateCardIndex)(currentCard.value);
                runOnJS(resetCardPosn)();
                runOnJS(startCardInAction)([tempCurrentCard.value]);
                // translationX.value = -xOffset;
                // translationY.value = -yOffset;
              } else {
                runOnJS(resetCardPosn)();
                // translationX.value = -xOffset;
                // translationY.value = -yOffset;
              }
            },
          );
          break;
        case event.velocityX > 2500:
          translationX.value = withSpring(
            1000,
            {overshootClamping: true},
            () => {
              if (filteredDeck.length) {
                if (currentCard.value + 1 < filteredDeck.length) {
                  currentCard.value = currentCard.value + 1;
                } else {
                  currentCard.value = 0;
                }
                runOnJS(updateCardIndex)(currentCard.value);
                // resetCardPosn();
                runOnJS(resetCardPosn)();
                // translationX.value = -xOffset;
                // translationY.value = -yOffset;
              } else {
                // resetCardPosn();
                runOnJS(resetCardPosn)();
                // translationX.value = -xOffset;
                // translationY.value = -yOffset;
              }
            },
          );
          break;
        default:
          translationX.value = withSpring(0 - xOffset);
          translationY.value = withSpring(0 - yOffset);
      }
    })
    .onFinalize(event => {});

  const rotateZ = () => {
    'worklet';
    return (translationX.value + xOffset) / (width / 30) + 'deg';
  };

  // const updateIndex = args => {
  //   setIndex(args);
  // };

  // useDerivedValue(() => {
  //   runOnJS(updateIndex)(currentCard.value);
  // });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
        {
          translateY: translationY.value,
        },
        {
          rotateZ: rotateZ(),
        },
      ],
      zIndex: 10,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode={'cover'}
        source={AppBackground}>
        <View style={styles.backgroundCard}>
          <Card name={filteredDeck[index2]?.name} />
        </View>
        <View style={styles.backgroundCard2}>
          <Card />
        </View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={rStyle}>
            {filteredDeck.length > 0 ? (
              <Pressable
                onPress={() => {
                  console.log('cui', filteredDeck[index]);
                  showModalBackOfCard(filteredDeck[index]);
                }}>
                <Card
                  index={index}
                  name={filteredDeck[index]?.name}
                  delete={deleteCard}
                />
              </Pressable>
            ) : (
              <NoCards />
            )}
          </Animated.View>
        </GestureDetector>
        <Modal
          isVisible={modalVisibleBackOfCard}
          onRequestClose={() => {
            hideModalBackOfCard();
          }}
          onBackdropPress={() => {
            hideModalBackOfCard();
          }}
          style={styles.modalContainer}>
          <BackOfCard card={filteredDeck[index]} />
        </Modal>
        <Modal isVisible={modalVisibleInAction}>
          <InAction />
        </Modal>
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
            <AddOrEditCardForm />
          </KeyboardAvoidingView>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Deck;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 3,
  },
  textStyle: {
    color: 'white',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCard: {
    zIndex: 5,
    transform: [
      {
        translateX: xOffset,
      },
      {
        translateY: yOffset,
      },
    ],
  },
  backgroundCard2: {
    position: 'absolute',
    zIndex: 1,
    transform: [
      {
        translateX: xOffset,
      },
      {
        translateY: yOffset - height / 4.6,
      },
      {
        rotateZ: '2deg',
      },
    ],
  },
});
