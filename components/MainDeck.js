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
*/

import React, {useContext, useState} from 'react';
import {StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import colours from '../assets/colours/colours';
import {Context as AuthContext} from '../services/Auth';
import Card from './Card';
import testCards from '../assets/data/testCards';
import {useQuery, gql} from '@apollo/client';

const {width, height} = Dimensions.get('window');
const toRadians = angle => angle * (Math.PI / 180);
const rotatedWidth =
  width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

const MainDeck = () => {
  const {state, signout} = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const currentCard = useSharedValue(0);
  let deckSize = testCards.length;

  const CARDQUERY = gql`
    query {
      cards {
        name
      }
    }
  `;

  const {data, loading, error} = useQuery(CARDQUERY);

  const gesture = Gesture.Pan()
    .onBegin(event => {
      console.log('gesture handler loaded');
    })
    .onStart(event => {
      console.log('gesture handler started');
    })
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
              currentCard.value = currentCard.value + 1;
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
              currentCard.value = currentCard.value + 1;
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
  console.log(data?.cards[index].name);
  return (
    <SafeAreaView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={rStyle}>
          {/* {data ? (
            <Card index={index} name={data.cards[index].name} />
          ) : (
            <Card index={index} name={'loading...'} />
          )} */}
          <Card index={index} name={testCards[index].name} />
        </Animated.View>
      </GestureDetector>
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
