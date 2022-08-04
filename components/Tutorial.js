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
import React from 'react';
import TutorialOverlay from 'react-native-tutorial-overlay';
import {useStore} from '../services/zustandContext';

import colours from '../assets/colours/colours';
import Icon from '../assets/appiconscaled.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Tutorial = props => {
  const {tutorialStep, moveToNextTutorialStep, resetTutorialStep} = useStore();
  const titleBarHeight = 55 + (Platform.OS === 'ios' ? 40 : 0);
  const tabBarHeight = 85;
  const viewPortHeight =
    height - titleBarHeight - tabBarHeight - StatusBar.currentHeight;
  const cardWidth = width * 0.72;
  const cardHeight = (width * 0.72) / 0.7;

  const tutorialData = [
    {
      text: `HabitMage is a spellbinding way to build habits. Let's take a quick look around...`,
      top: undefined,
      x: 1000,
      y: 0,
      w: 0,
      h: 0,
    },
    {
      text: `Each habit is represented by a card...`,
      top: undefined,
      x: width / 2 - cardWidth / 2 - 10,
      y: titleBarHeight + viewPortHeight / 2 - (width * 0.72) / 1.4 - 10,
      w: cardWidth + 20,
      h: cardHeight + 20,
    },
    {
      text: `Cards can be added to your deck in this tab...`,
      top: undefined,
      x: width / 2 - 40,
      y: titleBarHeight + viewPortHeight,
      w: 90,
      h: tabBarHeight - 20 + (Platform.OS === 'ios' ? 0 : 15),
    },
    {
      text: `Let's add a habit that we want to do every week on specific days...`,
    },
    {
      text: `The habit will now come up in our daily deck...`,
    },
    {
      text: `We can play the card to the left to do the habit, or play it to the right to skip it for now...`,
    },
    {
      text: `We can view the progress of all of our habits on the progress screen...`,
    },
    {
      text: `That's all! Have a look around!`,
    },
  ];

  return (
    <TutorialOverlay
      x={width / 2 - 40}
      y={titleBarHeight + viewPortHeight}
      width={90}
      height={tabBarHeight - 20 + (Platform.OS === 'ios' ? 0 : 15)}
      shape="rectangle">
      <Pressable
        onPress={() => moveToNextTutorialStep()}
        style={styles.pressableContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.speechContainer}>
            {/* <Image
              source={Icon}
              resizeMethod={'scale'}
              style={styles.iconStyle}
            /> */}

            {/* <Text style={styles.textStyle}>
              {tutorialStep}
              {tutorialData[tutorialStep - 1]?.text}
            </Text> */}
          </View>
          {tutorialStep == 1 && (
            <Text style={[styles.textStyle]}>[tap to continue]</Text>
          )}
          {/* <Button
            title={'Reset'}
            onPress={() => {
              resetTutorialStep();
            }}
          /> */}
        </View>
      </Pressable>
    </TutorialOverlay>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speechContainer: {
    // position: 'absolute',
    // top: 200,
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
