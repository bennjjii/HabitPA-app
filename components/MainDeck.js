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
import {StyleSheet, Dimensions, SafeAreaView} from 'react-native';
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
import colours from '../assets/colours/colours';
import {Context as AuthContext} from '../services/Auth';
import Card from './Card';
import NoCards from './NoCards';
import {useQuery, gql} from '@apollo/client';

import {useStore} from '../services/zustandContext';

import {
  getConnection,
  syncGetConnection,
  addHistoryInstance,
  listCards,
} from '../services/SQLite';

import useFilterCards from '../utilities/useFilterCards';

const {width, height} = Dimensions.get('window');
const toRadians = angle => angle * (Math.PI / 180);
const rotatedWidth =
  width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

const MainDeck = () => {
  //Obvious a silly way to do this vv
  const {deck, history, pushCardToHistory, Morning, Afternoon, Evening, Night} =
    useStore();
  const {state, signout} = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const currentCard = useSharedValue(0);
  let filteredDeck = undefined;
  let deckSize = deck.length;

  useEffect(() => {
    //do this all in the context module
    filteredDeck = useFilterCards(
      deck,
      history,
      Morning,
      Afternoon,
      Evening,
      Night,
    );
    console.log(filteredDeck);
  }, []);

  const CARDQUERY = gql`
    query {
      cards {
        name
      }
    }
  `;

  const {data, loading, error} = useQuery(CARDQUERY);

  const updateHistory = async args => {
    pushCardToHistory(deck[args[0]]);
    // try {
    //   const db = await getConnection();

    //   await addHistoryInstance(db, args[0] + 1);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const gesture = Gesture.Pan()
    .onUpdate(event => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
    })
    .onEnd(event => {
      switch (true) {
        case event.velocityX < -2500:
          translationX.value = withSpring(
            -500,
            {overshootClamping: true},
            () => {
              runOnJS(updateHistory)([currentCard.value]);
              if (currentCard.value + 1 < deckSize) {
                currentCard.value = currentCard.value + 1;
              } else {
                currentCard.value = 0;
              }
              translationX.value = 0;
              translationY.value = 0;
            },
          );
          break;
        case event.velocityX > 2500:
          translationX.value = withSpring(
            500,
            {overshootClamping: true},
            () => {
              if (currentCard.value + 1 < deckSize) {
                currentCard.value = currentCard.value + 1;
              } else {
                currentCard.value = 0;
              }
              translationX.value = 0;
              translationY.value = 0;
            },
          );
          break;
        default:
          translationX.value = withSpring(0);
          translationY.value = withSpring(0);
      }
    })
    .onFinalize(event => {});

  const rotateZ = () => {
    'worklet';
    return translationX.value / (width / 30) + 'deg';
  };

  const updateIndex = args => {
    setIndex(args);
  };

  useDerivedValue(() => {
    runOnJS(updateIndex)(currentCard.value);
  });

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
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{width: 100, height: 50, backgroundColor: 'blue'}}
        onPress={async () => {
          //console.log(deck);

          const db = await getConnection();
          const res = await listCards(db);
          // const rows = await db.executeSql(`SELECT * FROM cards;`);
          console.log(res[0].rows.raw());
        }}
      />
      {deck.length > 0 && (
        <GestureDetector gesture={gesture}>
          <Animated.View style={rStyle}>
            {filteredDeck ? (
              <Card index={index} name={filteredDeck.cards[index].name} />
            ) : (
              <NoCards />
            )}
            {/* <Card index={index} name={deck[index].name} /> */}
          </Animated.View>
        </GestureDetector>
      )}
    </SafeAreaView>
  );
};

export default MainDeck;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.background,
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
});
