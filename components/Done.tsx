import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect, forwardRef, useImperativeHandle, useRef} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';
import {
  useNonPersistentStore,
  usePersistentStore,
} from '../services/zustandContext';

const {width, height} = Dimensions.get('screen');

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
FontAwesome.loadFont();

interface DoneProps {
  source: 'BACK_OF_CARD' | 'HOME';
}

const Done = forwardRef<any, DoneProps>((props, ref) => {
  const doneOpacity = useSharedValue(0);
  const doneVisible = useSharedValue(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        log: () => {
          console.log('test');
        },
        triggerDoneAnimation: () => {
          doneOpacity.value = withSequence(
            withRepeat(
              withSequence(
                withTiming(1, {
                  duration: 70,
                  easing: Easing.out(Easing.exp),
                }),
                withTiming(0, {
                  duration: 70,
                  easing: Easing.out(Easing.exp),
                }),
              ),
              7,
            ),
            withTiming(1, {
              duration: 70,
              easing: Easing.out(Easing.exp),
            }),
            withTiming(0, {
              duration: 1000,
              easing: Easing.out(Easing.exp),
            }),
          );
        },
      };
    },
    [],
  );

  const doneReanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: doneOpacity.value,
    };
  }, [doneOpacity]);

  return (
    <Animated.View
      style={[doneReanimatedStyle, styles.container]}
      pointerEvents="none">
      <Text style={styles.cardText}>Done!</Text>
    </Animated.View>
  );
});

// const Done: React.FC<DoneProps> = ({source}) => {
//   const doneOpacity = useSharedValue(0);
//   const doneVisible = useSharedValue(false);
//   const {setDoneAnimation} = useNonPersistentStore();

//   useEffect(() => {
//     setDoneAnimation(triggerDoneAnimation, source);
//   }, []);

//   const triggerDoneAnimation = () => {
//     doneOpacity.value = withSequence(
//       withRepeat(
//         withSequence(
//           withTiming(1, {
//             duration: 70,
//             easing: Easing.out(Easing.exp),
//           }),
//           withTiming(0, {
//             duration: 70,
//             easing: Easing.out(Easing.exp),
//           }),
//         ),
//         7,
//       ),
//       withTiming(1, {
//         duration: 70,
//         easing: Easing.out(Easing.exp),
//       }),
//       withTiming(0, {
//         duration: 1000,
//         easing: Easing.out(Easing.exp),
//       }),
//     );
//   };

//   const doneReanimatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: doneOpacity.value,
//     };
//   }, [doneOpacity]);

//   return (
//     <Animated.View
//       style={[doneReanimatedStyle, styles.container]}
//       pointerEvents="none">
//       <Text style={styles.cardText}>Done!</Text>
//     </Animated.View>
//   );
// };

export default Done;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  cardText: {
    fontFamily: 'PublicPixel',
    fontSize: 60,
    color: '#00EE00',
  },
});
