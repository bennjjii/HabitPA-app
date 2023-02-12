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
HabitMage is an app designed to facilitate incremental learning
*/

import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Pressable,
  View,
  ImageBackground,
  Platform,
} from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
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
import {useNavigationState} from '@react-navigation/native';

const AppBackground = require('./../assets/pixelBgLic1.png');

import {
  usePersistentStore,
  useNonPersistentStore,
} from '../services/zustandContext';

const {width, height} = Dimensions.get('screen');
const xOffset = 0;
const yOffset = (width * 0.72) / 1.4;

const Deck = () => {
  const navState = useNavigationState(state => state.index);
  if (global.enableLogging) {
    console.log('NavstateDeck', navState);
    console.log(
      'Dims',
      Dimensions.get('window').height,
      Dimensions.get('screen').height,
      height,
    );
  }

  const {deck, history, getFilteredDeck} = usePersistentStore();

  const {
    modalVisibleBackOfCard,
    showModalBackOfCard,
    hideModalBackOfCard,
    switchToInAction,
    modalVisibleInAction,
    modalVisibleAddCard,
    hideModalAddCard,
  } = useNonPersistentStore();

  const [cardInAction, setCardInAction] = useState(undefined);
  const [index, setIndex] = useState(0); //Top card in stack
  const [index2, setIndex2] = useState(1); //Second from top card in stack
  const onscreenCardRestingPosition = {
    x: 0 - xOffset,
    y: 0 - yOffset,
  };
  const offscreenCardRestingPosition = {
    x: width * 0.7,
    y: width * 0.1,
  };
  const onscreenCardTranslationX = useSharedValue(
    onscreenCardRestingPosition.x,
  );
  const onscreenCardTranslationY = useSharedValue(
    onscreenCardRestingPosition.y,
  );
  const offscreenCardTranslationX = useSharedValue(
    offscreenCardRestingPosition.x,
  );
  const offscreenCardTranslationY = useSharedValue(
    offscreenCardRestingPosition.y,
  );
  enum SwipingDirection {
    OnToPile,
    OffOfPile,
    Active,
    Neutral,
  }
  const swipingDirection = useSharedValue(SwipingDirection.Neutral);
  const swipingSessionStartX = useSharedValue(undefined);
  const swipingSessionStartY = useSharedValue(undefined);
  const currentCard = useSharedValue(0);
  const tempCurrentCard = useSharedValue(0);
  let [filteredDeck, setFilteredDeck] = useState(getFilteredDeck());

  //TODO why async? Test without
  const startCardInAction = async args => {
    if (global.enableLogging) {
      console.log('card sent to history', filteredDeck[args[0]]);
      console.log('card index', args[0]);
    }
    setCardInAction(filteredDeck[args[0]]);
    switchToInAction(filteredDeck[args[0]], true);
  };

  const resetCardPosn = () => {
    setTimeout(() => {
      onscreenCardTranslationX.value = -xOffset;
      onscreenCardTranslationY.value = -yOffset;
    }, 50);
  };

  const updateCardIndex = args => {
    setIndex(args);
    setTimeout(() => {
      setIndex2(filteredDeck.length > args + 1 ? args + 1 : 0);
    }, 100);
  };

  useEffect(() => {
    setFilteredDeck(getFilteredDeck());
  }, [history]);

  useEffect(() => {
    setFilteredDeck(getFilteredDeck());
    if (index >= getFilteredDeck().length) {
      currentCard.value = 0;
      setIndex(0);
      setIndex2(1);
    }
  }, [deck]);
  // rules
  // if finger is moving right, record position, pick up card from pile, hold until we get back to pick up position and then put back and move card onto pile
  //if finger is moving left, record position, put card back onto pile
  const gesture = Gesture.Pan()
    .onBegin(event => {
      swipingDirection.value = SwipingDirection.Active;
      swipingSessionStartX.value = event.absoluteX;
      swipingSessionStartY.value = event.translationY - yOffset;
    })
    .onUpdate(event => {
      console.log(
        event.translationX * 1.6 + offscreenCardRestingPosition.x,
        event.absoluteX,
        event.translationX,
        swipingSessionStartX.value,
        width,
      );
      if (event.absoluteX > swipingSessionStartX.value - 30) {
        swipingDirection.value = SwipingDirection.OffOfPile;
        onscreenCardTranslationX.value = event.translationX - xOffset;
        onscreenCardTranslationY.value = event.translationY - yOffset;
        offscreenCardTranslationX.value = withSpring(
          offscreenCardRestingPosition.x,
        );
        offscreenCardTranslationY.value = withSpring(
          offscreenCardRestingPosition.y,
        );
      } else {
        swipingDirection.value = SwipingDirection.OnToPile;
        offscreenCardTranslationX.value =
          event.translationX * 1.6 + offscreenCardRestingPosition.x;
        offscreenCardTranslationY.value =
          event.translationY + offscreenCardRestingPosition.y;
        onscreenCardTranslationX.value = withSpring(0 - xOffset);
        onscreenCardTranslationY.value = withSpring(0 - yOffset);
      }
    })
    .onEnd(event => {
      switch (true) {
        // case event.velocityY < -2500:
        //             translationY.value = withSpring(
        //     -1000,
        //     {overshootClamping: true},
        //     () => {
        //       if (filteredDeck.length) {
        //         tempCurrentCard.value = currentCard.value;
        //         if (currentCard.value + 1 < filteredDeck.length) {
        //           currentCard.value = currentCard.value + 1;
        //         } else {
        //           currentCard.value = 0;
        //         }
        //         runOnJS(updateCardIndex)(currentCard.value);
        //         runOnJS(resetCardPosn)();
        //         runOnJS(startCardInAction)([tempCurrentCard.value]);
        //       } else {
        //         runOnJS(resetCardPosn)();
        //       }
        //     },
        //   );
        //   break;
        //onto pile
        case event.velocityX < -2500 ||
          (event.translationX * 1.6 + offscreenCardRestingPosition.x <
            width / 10 &&
            swipingDirection.value == SwipingDirection.OnToPile):
          offscreenCardTranslationX.value = withSpring(
            onscreenCardRestingPosition.x,
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
                // runOnJS(resetCardPosn)();
                runOnJS(startCardInAction)([tempCurrentCard.value]);
              } else {
                // runOnJS(resetCardPosn)();
              }
              onscreenCardTranslationX.value = onscreenCardRestingPosition.x;
              onscreenCardTranslationY.value = onscreenCardRestingPosition.y;
              offscreenCardTranslationX.value = offscreenCardRestingPosition.x;
              offscreenCardTranslationY.value = offscreenCardRestingPosition.y;
            },
          );
          break;
        //off of pile
        case event.velocityX > 2500 ||
          (event.absoluteX > width - 70 &&
            swipingDirection.value == SwipingDirection.OffOfPile):
          onscreenCardTranslationX.value = withSpring(
            offscreenCardRestingPosition.x,
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
                // runOnJS(resetCardPosn)();
              } else {
                // runOnJS(resetCardPosn)();
              }
              onscreenCardTranslationX.value = onscreenCardRestingPosition.x;
              onscreenCardTranslationY.value = onscreenCardRestingPosition.y;
              offscreenCardTranslationX.value = offscreenCardRestingPosition.x;
              offscreenCardTranslationY.value = offscreenCardRestingPosition.y;
            },
          );
          break;
        default:
          onscreenCardTranslationX.value = withSpring(
            onscreenCardRestingPosition.x,
          );
          onscreenCardTranslationY.value = withSpring(
            onscreenCardRestingPosition.y,
          );
          offscreenCardTranslationX.value = withSpring(
            offscreenCardRestingPosition.x,
          );
          offscreenCardTranslationY.value = withSpring(
            offscreenCardRestingPosition.y,
          );
      }
    })
    .onFinalize(event => {
      swipingDirection.value = SwipingDirection.Neutral;
      swipingSessionStartX.value = undefined;
      swipingSessionStartY.value = undefined;
    });

  const onscreenCardRotateZ = () => {
    'worklet';
    return (onscreenCardTranslationX.value + xOffset) / (width / 30) + 'deg';
  };

  const offscreenCardRotateZ = () => {
    'worklet';
    return (offscreenCardTranslationX.value + xOffset) / (width / 30) + 'deg';
  };

  const offscreenCardOpacity = () => {
    'worklet';
    return Math.min(
      1.4 - offscreenCardTranslationX.value / offscreenCardRestingPosition.x,
      1,
    );
  };

  const onscreenCardReanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: onscreenCardTranslationX.value,
        },
        {
          translateY: onscreenCardTranslationY.value,
        },
        {
          rotateZ: onscreenCardRotateZ(),
        },
      ],
      zIndex: 10,
    };
  });

  const offscreenCardReanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offscreenCardTranslationX.value,
        },
        {
          translateY: offscreenCardTranslationY.value,
        },
        {
          rotateZ: offscreenCardRotateZ(),
        },
      ],
      zIndex: 13,
      opacity: offscreenCardOpacity(),
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
          <Animated.View style={onscreenCardReanimatedStyle}>
            {filteredDeck.length > 0 ? (
              <Pressable
                onPress={() => {
                  if (global.enableLogging) {
                    console.log('cui', filteredDeck[index]);
                  }
                  showModalBackOfCard(filteredDeck[index]);
                }}>
                <Card index={index} name={filteredDeck[index]?.name} />
              </Pressable>
            ) : (
              <NoCards />
            )}
          </Animated.View>
        </GestureDetector>
        {/* <View style={styles.offscreenCardContainerView}> */}
        <Animated.View
          style={[
            offscreenCardReanimatedStyle,
            styles.offscreenCardContainerView,
          ]}>
          <Card index={index} name={filteredDeck[index]?.name} />
        </Animated.View>
        {/* </View> */}
        <Modal
          isVisible={modalVisibleBackOfCard && navState == 0}
          onRequestClose={() => {
            hideModalBackOfCard();
          }}
          onBackdropPress={() => {
            hideModalBackOfCard();
          }}
          style={styles.modalContainer}>
          <BackOfCard card={filteredDeck[index]} />
        </Modal>
        <Modal isVisible={modalVisibleInAction && navState == 0}>
          <InAction />
        </Modal>
        <Modal
          isVisible={modalVisibleAddCard && navState == 0}
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
            <AddOrEditCardForm sourceTab="Deck" />
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
  offscreenCardContainerView: {
    position: 'absolute',
    zIndex: 300,
  },
});
