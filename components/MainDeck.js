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
*/

import React, {useContext} from 'react';
import {StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {Context as AuthContext} from '../services/Auth';
import Card from './Card';

const {
  add,
  multiply,
  neq,
  spring,
  cond,
  eq,
  event,
  lessThan,
  greaterThan,
  and,
  call,
  set,
  clockRunning,
  startClock,
  stopClock,
  Clock,
  concat,
  interpolate,
  Extrapolate,
} = Animated;

const runSpring = (clock, value, dest) => {
  const state = {
    finished: useSharedValue(0),
    velocity: useSharedValue(0),
    position: useSharedValue(0),
    time: useSharedValue(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: useSharedValue(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
};

const {width, height} = Dimensions.get('window');
const toRadians = angle => angle * (Math.PI / 180);
const rotatedWidth =
  width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

const MainDeck = () => {
  const {state, signout} = useContext(AuthContext);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const velocityX = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const gestureState = useSharedValue(State.UNDETERMINED);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.translateX = translationX.value;
      ctx.translateY = translationY.value;
    },
    onActive: (event, ctx) => {
      translationX.value = event.translationX + ctx.translateX;
      translationY.value = event.translationY + ctx.translateY;
    },
    onEnd: (event, ctx) => {
      switch (true) {
        case event.velocityX < -2500:
          translationX.value = withSpring(-500);
          break;
        case event.velocityX > 2500:
          translationX.value = withSpring(500);
          break;
        default:
          translationX.value = withSpring(0);
          translationY.value = withSpring(0);
      }
    },
  });
  const rotateZ = () => {
    'worklet';
    return translationX.value / (width / 30) + 'deg';
  };

  // const rotateZ = concat(
  //   interpolate(translateX, {
  //     inputRange: [-width / 2, width / 2],
  //     outputRange: [15, -15],
  //     extrapolate: Extrapolate.CLAMP,
  //   }),
  //   "deg",
  // );

  //

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
    <SafeAreaView style={styles.viewWrapper}>
      <PanGestureHandler onHandlerStateChange={panGestureEvent}>
        <Animated.View style={rStyle}>
          <Card />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default MainDeck;

const styles = StyleSheet.create({
  viewWrapper: {
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
