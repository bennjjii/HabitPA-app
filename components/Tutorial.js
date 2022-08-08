import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  Button,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import TutorialOverlay from 'react-native-tutorial-overlay';
import {useStore} from '../services/zustandContext';
import {CommonActions} from '@react-navigation/native';

import colours from '../assets/colours/colours';
import Icon from '../assets/appiconscaled.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Tutorial = ({navigationCtx}) => {
  const {
    tutorialStep,
    tutorialSkipPermitted,
    moveToNextTutorialStep,
    resetTutorialStep,
    showModalAddCard,
    startTutorialFillInCard,
    endTutorialFillInCard,
    blockTutorialSkip,
    unblockTutorialSkip,
  } = useStore();
  useEffect(() => {
    unblockTutorialSkip();
    resetTutorialStep();
  }, []);

  const titleBarHeight = 55 + (Platform.OS === 'ios' ? 40 : 0);
  const tabBarHeight = 85;
  const viewPortHeight =
    height - titleBarHeight - tabBarHeight - StatusBar.currentHeight;
  const cardWidth = width * 0.72;
  const cardHeight = (width * 0.72) / 0.7;
  const miniCardWidth = width * 0.42;
  const miniCardHeight = (width * 0.42) / 0.7;
  console.log('tutorialSkipPermitted', tutorialSkipPermitted);

  const tutorialData = [
    {
      text: `HabitMage is a spellbinding way to build habits. Let's take a quick look around...`,
      top: undefined,
      x: 1000,
      y: 0,
      w: 0,
      h: 0,
      fn: () => {},
    },
    {
      text: `Each habit is represented by a card...`,
      top: titleBarHeight + viewPortHeight / 2 + cardHeight / 2 + 30,
      x: width / 2 - cardWidth / 2 - 10,
      y: titleBarHeight + viewPortHeight / 2 - (width * 0.72) / 1.4 - 10,
      w: cardWidth + 20,
      h: cardHeight + 20,
      fn: () => {},
    },
    {
      text: `Cards can be added to your deck in this tab...`,
      top: undefined,
      x: width / 2 - 40,
      y: titleBarHeight + viewPortHeight,
      w: 90,
      h: tabBarHeight - 20 + (Platform.OS === 'ios' ? 0 : 15),
      fn: () => {},
    },
    {
      text: `Let's add a habit that we want to do every week on specific days...`,
      top: titleBarHeight + viewPortHeight / 2 + cardHeight / 2 + 30,
      x: width / 2 - miniCardWidth - 20,
      y: titleBarHeight + miniCardHeight + 20,
      w: width / 2 - 20,
      h: miniCardHeight + 20,
      fn: () => {
        navigationCtx.dispatch(
          CommonActions.navigate({
            name: 'Add Card',
            params: {},
          }),
        );
      },
    },
    {
      text: ``,
      x: -100,
      y: -100,
      w: 1000,
      h: 1000,
      fn: () => {
        // blockTutorialSkip();
        const t = setTimeout(() => {
          console.log('Timeout ran');
          startTutorialFillInCard();
          showModalAddCard('EW');
          clearTimeout(t);
        }, 1000);
      },
    },
    {
      text: `The habit will now come up in our daily deck...`,
      top: undefined,
      x: width / 2 - width / 2.25,
      y: titleBarHeight + viewPortHeight,
      w: 90,
      h: tabBarHeight - 20 + (Platform.OS === 'ios' ? 0 : 15),
      fn: () => {},
    },
    {
      text: `We can play the card to the left to do the habit, or play it to the right to skip it for now...`,
      top: titleBarHeight + viewPortHeight / 2 + cardHeight / 2 + 30,
      x: -100,
      y: titleBarHeight + viewPortHeight / 2 - (width * 0.72) / 1.4 - 10,
      w: 1000,
      h: cardHeight + 20,
      fn: () => {
        navigationCtx.dispatch(
          CommonActions.navigate({
            name: 'Deck',
            params: {},
          }),
        );
      },
    },
    {
      text: `We can view the progress of all of our habits on the progress screen...`,
      x: width / 2 + width / 4.5,
      y: titleBarHeight + viewPortHeight,
      w: 90,
      h: tabBarHeight - 20 + (Platform.OS === 'ios' ? 0 : 15),
      fn: () => {},
    },
    {
      text: `That's all! Have a look around!`,
      top: undefined,
      x: 1000,
      y: 0,
      w: 0,
      h: 0,
      fn: () => {},
    },
  ];

  useEffect(() => {
    console.log('Tutorial step ', tutorialStep, ' ran');
    tutorialData[tutorialStep - 1].fn();
  }, [tutorialStep]);

  return (
    <>
      {tutorialStep !== 5 && (
        <TutorialOverlay
          x={tutorialData[tutorialStep - 1]?.x}
          y={tutorialData[tutorialStep - 1]?.y}
          width={tutorialData[tutorialStep - 1]?.w}
          height={tutorialData[tutorialStep - 1]?.h}
          shape="rectangle">
          <Pressable
            onPress={() => {
              if (true) {
                moveToNextTutorialStep();
              }
            }}
            style={styles.pressableContainer}>
            <View
              style={[
                styles.mainContainer,
                tutorialData[tutorialStep - 1]?.top
                  ? {top: tutorialData[tutorialStep - 1]?.top}
                  : {top: titleBarHeight + viewPortHeight / 2 - 20},
              ]}>
              <View style={styles.speechContainer}>
                {tutorialData[tutorialStep - 1]?.text.length > 0 && (
                  <Image
                    source={Icon}
                    resizeMethod={'scale'}
                    style={styles.iconStyle}
                  />
                )}

                <Text style={styles.textStyle}>
                  {tutorialStep}
                  {'  '}
                  {tutorialData[tutorialStep - 1]?.text}
                </Text>
              </View>
              {tutorialStep == 1 && (
                <Text style={[styles.textStyle]}>[tap to continue]</Text>
              )}
              <Button
                title={'Reset'}
                onPress={() => {
                  resetTutorialStep();
                }}
              />
            </View>
          </Pressable>
        </TutorialOverlay>
      )}
      <Button
        title={'Modal'}
        onPress={() => {
          showModalAddCard('EW');
        }}
      />
      <Button
        title={'Reset'}
        onPress={() => {
          resetTutorialStep();
        }}
      />
    </>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    position: 'absolute',
    top: 200,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speechContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    color: colours.pixelTextFg1,
    fontFamily: 'PublicPixel',
    width: width / 1.5,
  },
  iconStyle: {
    width: width / 3,
    height: width / 3,
  },
});
