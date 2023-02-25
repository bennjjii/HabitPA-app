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

/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */

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
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  withSequence,
  withRepeat,
  useDerivedValue,
  clockRunning,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
//
import colours from '../assets/colours/colours';
import {Context as AuthContext} from '../services/Auth';
import Card from './Card';
import NoCards from './NoCards';
import Done from './Done';
import {useNavigationState} from '@react-navigation/native';

const AppBackground = require('./../assets/pixelBgLic1.png');

import {
  usePersistentStore,
  useNonPersistentStore,
} from '../services/zustandContext';
import {CardClass} from './CardClass';

/* -------------------------------------------------------------------------- */
/*                            Application constants                           */
/* -------------------------------------------------------------------------- */

const {width, height} = Dimensions.get('screen');
const xOffset = 0;
const yOffset = (width * 0.72) / 1.4;
const SWIPE_SENSITIVITYX: number = 500;
const SWIPE_SENSITIVITYY: number = 2000;

const Deck = ({doneAnimationRefHome}) => {
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

  /* -------------------------------------------------------------------------- */
  /*                                   Context                                  */
  /* -------------------------------------------------------------------------- */

  const {deck, history, getFilteredDeck, pushCardToHistory} =
    usePersistentStore();
  let [filteredDeck, setFilteredDeck] = useState(getFilteredDeck());

  const {showBackOfCardModal} = useNonPersistentStore();

  //convention - 0 is top card in stack, 1 is card underneath etc
  // say 10 cards
  //base offset card 2
  //underneath card 1
  //onscreen card 0
  //offscreen card 9  == length -1
  //stand in card 8 == length -2
  //states
  //0 cards in deck - NoCards only shown - swiping disabled
  //1 cards in deck - onscreen card only shown
  //2 cards in deck - onscreen, offscreen card, underneath and stand in shown
  //3 cards in deck - 2 + base card

  enum CARD_ROLE {
    BASE = 'BASE',
    UNDERNEATH = 'UNDERNEATH',
    ONSCREEN = 'ONSCREEN',
    OFFSCREEN = 'OFFSCREEN',
    STANDIN = 'STANDIN',
  }

  interface CardPositions {
    BASE: number;
    UNDERNEATH: number;
    ONSCREEN: number;
    OFFSCREEN: number;
    STANDIN: number;
  }

  /* -------------------------------------------------------------------------- */
  /*                          Get index of card worklet                         */
  /* -------------------------------------------------------------------------- */

  const getIndexOfCard = (
    currentOnScreenCardIndex: number,
    filteredDeck: Array<CardClass>,
    role: CARD_ROLE,
  ): number | undefined => {
    'worklet';
    const CARD_POSITIONS: CardPositions = {
      BASE: 2,
      UNDERNEATH: 1,
      ONSCREEN: 0,
      OFFSCREEN: -1,
      STANDIN: -2,
    };
    let deckLength = filteredDeck.length;

    switch (role) {
      case CARD_ROLE.ONSCREEN:
        if (deckLength < 1) {
          return undefined;
        }
      case CARD_ROLE.OFFSCREEN:
        if (deckLength < 2) {
          return undefined;
        }
      case CARD_ROLE.STANDIN:
        if (deckLength < 2) {
          return undefined;
        }
      case CARD_ROLE.UNDERNEATH:
        if (deckLength < 2) {
          return undefined;
        }
      case CARD_ROLE.BASE:
        if (deckLength < 3) {
          return undefined;
        }
    }
    if (currentOnScreenCardIndex + CARD_POSITIONS[role] < 0) {
      return deckLength + (currentOnScreenCardIndex + CARD_POSITIONS[role]);
    }
    if (
      currentOnScreenCardIndex + CARD_POSITIONS[role] >
      filteredDeck.length - 1
    ) {
      return currentOnScreenCardIndex + CARD_POSITIONS[role] - 1;
    }
    return currentOnScreenCardIndex + CARD_POSITIONS[role];
  };

  /* -------------------------------------------------------------------------- */
  /*                                Card indices                                */
  /* -------------------------------------------------------------------------- */

  //index of card being shown - 0 is bottom of deck
  const onscreenCardIndex = useSharedValue(0);
  const offscreenCardIndex = useDerivedValue(() => {
    return getIndexOfCard(
      onscreenCardIndex.value,
      filteredDeck,
      CARD_ROLE.OFFSCREEN,
    );
  });
  const standinCardIndex = useDerivedValue(() => {
    return getIndexOfCard(
      onscreenCardIndex.value,
      filteredDeck,
      CARD_ROLE.STANDIN,
    );
  });
  const underneathCardIndex = useDerivedValue(() => {
    return getIndexOfCard(
      onscreenCardIndex.value,
      filteredDeck,
      CARD_ROLE.UNDERNEATH,
    );
  });
  const baseCardIndex = useDerivedValue(() => {
    return getIndexOfCard(
      onscreenCardIndex.value,
      filteredDeck,
      CARD_ROLE.BASE,
    );
  });
  //TODO some bugs will occur here
  const [indexCardOffScreen, setIndexCardOffScreen] = useState(
    filteredDeck.length > 1 ? filteredDeck.length - 1 : 1,
  );
  const [indexCardOnScreen, setIndexCardOnScreen] = useState(0); //Top card in stack
  const [indexCardUnderneath, setIndexCardUnderneath] = useState(1); //Second from top card in stack

  /* -------------------------------------------------------------------------- */
  /*                                 Coordinates                                */
  /* -------------------------------------------------------------------------- */

  const onscreenCardRestingPosition = {
    x: 0 - xOffset,
    y: 0,
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

  /* -------------------------------------------------------------------------- */
  /*                        State to manage swiping logic                       */
  /* -------------------------------------------------------------------------- */

  enum SwipingDirection {
    OnToPile,
    OffOfPile,
    Active,
    Neutral,
  }
  const swipingDirection = useSharedValue(SwipingDirection.Neutral);
  const swipingSessionStartX = useSharedValue(undefined);
  const swipingSessionStartY = useSharedValue(undefined);

  /* -------------------------------------------------------------------------- */
  /*                 When we 'do' the card from the deck screen                 */
  /* -------------------------------------------------------------------------- */

  const startCardInAction = args => {
    if (global.enableLogging) {
      console.log('card sent to history', filteredDeck[args[0]]);
      console.log('card index', args[0]);
    }
    // setCardInAction(filteredDeck[args[0]]);
    // switchToInAction(filteredDeck[args[0]], true);
    pushCardToHistory(filteredDeck[args[0]]);
    doneAnimationRefHome.current.triggerDoneAnimation();
  };

  /* -------------------------------------------------------------------------- */
  /*                           Double buffering logic                           */
  /* -------------------------------------------------------------------------- */

  const resetCardPosn = () => {
    setTimeout(() => {
      onscreenCardTranslationX.value = onscreenCardRestingPosition.x;
      onscreenCardTranslationY.value = onscreenCardRestingPosition.y;
      offscreenCardTranslationX.value = offscreenCardRestingPosition.x;
      offscreenCardTranslationY.value = offscreenCardRestingPosition.y;
    }, 5);
  };

  const updateCardIndex = args => {
    setIndexCardOnScreen(args);
    console.log(args - 1, filteredDeck.length - 1);
    //we have to change the card underneath before we reset the card positions...??
    setTimeout(() => {
      setIndexCardUnderneath(filteredDeck.length > args + 1 ? args + 1 : 0);
      setIndexCardOffScreen(args > 0 ? args - 1 : filteredDeck.length - 1);
    }, 10);
  };

  useEffect(() => {
    setFilteredDeck(getFilteredDeck());
  }, [history]);

  useEffect(() => {
    setFilteredDeck(getFilteredDeck());
    //if we remove a card what happens?
    if (indexCardOnScreen >= getFilteredDeck().length) {
      onscreenCardIndex.value = 0;
      setIndexCardOnScreen(0);
      setIndexCardUnderneath(1);
    }
  }, [deck]);

  const openModalBackOfCard = () => {
    showBackOfCardModal(filteredDeck[indexCardOnScreen]);
  };

  /* -------------------------------------------------------------------------- */
  /*                              Gesture handlers                              */
  /* -------------------------------------------------------------------------- */

  const tapGesture = Gesture.Tap()
    .maxDistance(20)
    .onStart(() => {
      runOnJS(openModalBackOfCard)();
    });
  const panGesture = Gesture.Pan()
    .onBegin(event => {
      swipingDirection.value = SwipingDirection.Active;
      swipingSessionStartX.value = event.absoluteX;
      swipingSessionStartY.value = event.translationY - yOffset;
    })
    .onUpdate(event => {
      if (filteredDeck.length <= 1) {
        return;
      }
      console.log(offscreenCardTranslationX.value);
      if (event.absoluteX > swipingSessionStartX.value - 30) {
        swipingDirection.value = SwipingDirection.OffOfPile;
        onscreenCardTranslationX.value = Math.min(
          event.translationX - xOffset,
          offscreenCardRestingPosition.x - 0,
        );
        onscreenCardTranslationY.value = event.translationY;
        offscreenCardTranslationX.value = withSpring(
          offscreenCardRestingPosition.x,
        );
        offscreenCardTranslationY.value = withSpring(
          offscreenCardRestingPosition.y,
        );
      } else {
        swipingDirection.value = SwipingDirection.OnToPile;
        offscreenCardTranslationX.value = Math.max(
          event.translationX * 1.6 + offscreenCardRestingPosition.x,
          -20,
        );
        offscreenCardTranslationY.value =
          event.translationY + offscreenCardRestingPosition.y;
        onscreenCardTranslationX.value = withSpring(0 - xOffset);
        onscreenCardTranslationY.value = withSpring(0);
      }
    })
    .onEnd(event => {
      switch (true) {
        //done case
        case event.velocityY < -SWIPE_SENSITIVITYY:
          onscreenCardTranslationY.value = withSpring(
            -1000,
            {overshootClamping: true},
            () => {
              if (filteredDeck.length) {
                runOnJS(startCardInAction)([onscreenCardIndex.value]);
                if (onscreenCardIndex.value + 1 < filteredDeck.length) {
                  onscreenCardIndex.value = onscreenCardIndex.value + 1;
                } else {
                  onscreenCardIndex.value = 0;
                }
                runOnJS(updateCardIndex)(onscreenCardIndex.value);
                runOnJS(resetCardPosn)();
              }
            },
          );
          break;
        //onto pile - decrease index
        case event.velocityX < -SWIPE_SENSITIVITYX ||
          (event.translationX * 1.6 + offscreenCardRestingPosition.x <
            width / 10 &&
            swipingDirection.value == SwipingDirection.OnToPile):
          offscreenCardTranslationX.value = withSpring(
            onscreenCardRestingPosition.x,
            {overshootClamping: true},
            () => {
              if (onscreenCardIndex.value > 0) {
                onscreenCardIndex.value = onscreenCardIndex.value - 1;
              } else {
                onscreenCardIndex.value = filteredDeck.length - 1;
              }
              runOnJS(updateCardIndex)(onscreenCardIndex.value);
              runOnJS(resetCardPosn)();
            },
          );
          offscreenCardTranslationY.value = withSpring(
            onscreenCardRestingPosition.y,
          );
          break;
        //off of pile - increase index
        case event.velocityX > SWIPE_SENSITIVITYX ||
          (event.absoluteX > width - 70 &&
            swipingDirection.value == SwipingDirection.OffOfPile):
          onscreenCardTranslationX.value = withSpring(
            offscreenCardRestingPosition.x,
            {overshootClamping: true},
            () => {
              if (onscreenCardIndex.value + 1 < filteredDeck.length) {
                onscreenCardIndex.value = onscreenCardIndex.value + 1;
              } else {
                onscreenCardIndex.value = 0;
              }
              runOnJS(updateCardIndex)(onscreenCardIndex.value);
              runOnJS(resetCardPosn)();
            },
          );
          onscreenCardTranslationY.value = withSpring(
            offscreenCardRestingPosition.y,
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

  /* -------------------------------------------------------------------------- */
  /*                                  Worklets                                  */
  /* -------------------------------------------------------------------------- */

  const onscreenCardRotateZ = () => {
    'worklet';
    return (onscreenCardTranslationX.value + xOffset) / (width / 30) + 'deg';
  };

  const offscreenCardRotateZ = () => {
    'worklet';
    return (offscreenCardTranslationX.value + xOffset) / (width / 30) + 'deg';
  };

  const onscreenCardOpacity = () => {
    'worklet';
    return (
      1 -
      Math.min(
        Math.max(onscreenCardTranslationX.value, 0) / (width / 2) - 0.4,
        1,
      )
    );
  };
  const offscreenCardOpacity = () => {
    'worklet';
    return Math.min(
      1.4 - offscreenCardTranslationX.value / offscreenCardRestingPosition.x,
      1,
    );
  };

  const standInCardOpacity = useDerivedValue(() => {
    'worklet';
    return (
      1 -
      Math.min(
        offscreenCardTranslationX.value / offscreenCardRestingPosition.x,
        1,
      ) -
      0.6
    );
  });

  /* -------------------------------------------------------------------------- */
  /*                              Reanimated styles                             */
  /* -------------------------------------------------------------------------- */

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
      opacity: onscreenCardOpacity(),
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

      opacity: offscreenCardOpacity(),
    };
  });

  const standInCardReanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offscreenCardRestingPosition.x,
        },
        {
          translateY: offscreenCardRestingPosition.y,
        },
        {
          rotateZ:
            (offscreenCardRestingPosition.x + xOffset) / (width / 30) + 'deg',
        },
      ],
      //could use useDerivedValue or useAnimatedReaction
      opacity: standInCardOpacity.value,
    };
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                              React components                              */
  /* -------------------------------------------------------------------------- */

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode={'cover'}
        source={AppBackground}>
        <GestureDetector gesture={Gesture.Simultaneous(panGesture, tapGesture)}>
          <View styles={styles.deckContainer}>
            {/* base card */}

            <View style={styles.baseCard}>
              <Card />
            </View>

            {/* underneath card */}

            <View style={styles.underneathCard}>
              <Card name={filteredDeck[indexCardUnderneath]?.name} />
            </View>

            {/* onscreen card */}
            <Animated.View style={[onscreenCardReanimatedStyle]}>
              {filteredDeck.length > 0 ? (
                <Card
                  index={indexCardOnScreen}
                  name={filteredDeck[indexCardOnScreen]?.name}
                />
              ) : (
                <NoCards />
              )}
            </Animated.View>
            {/* offscreen card */}
            <Animated.View
              style={[
                offscreenCardReanimatedStyle,
                styles.offscreenCardContainerView,
              ]}>
              <Card
                index={indexCardOffScreen}
                name={filteredDeck[indexCardOffScreen]?.name}
              />
            </Animated.View>
            {/* stand in card */}
            <Animated.View
              style={[
                standInCardReanimatedStyle,
                styles.standInCardContainerView,
              ]}>
              <Card
                index={indexCardOffScreen}
                // name={filteredDeck[indexCardOffScreen]?.name}
                name={'stand in'}
              />
            </Animated.View>
          </View>
        </GestureDetector>
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
    height: '100%',
  },
  deckContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
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
  underneathCard: {
    position: 'absolute',
    zIndex: 5,
    transform: [
      {
        translateX: xOffset,
      },
      {
        translateY: 0,
      },
    ],
  },
  baseCard: {
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
  onscreenCardContainerView: {
    position: 'absolute',
    zIndex: 200,
  },
  offscreenCardContainerView: {
    position: 'absolute',
    zIndex: 300,
  },
  standInCardContainerView: {
    position: 'absolute',
    zIndex: 400,
  },
});
