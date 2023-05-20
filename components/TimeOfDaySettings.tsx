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

import colours from '../assets/colours/colours';
const AppBackground = require('./../assets/pixelBgLic1.png');
import {usePersistentStore} from '../services/zustandContext';
import BackOfCard from './BackOfCard';
// import {Picker, DatePicker} from '@davidgovea/react-native-wheel-datepicker';

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
const pickerGenerator = count => {
  const t = [];
  for (let i = 1; i < count + 1; i++) {
    t.push(i);
  }
  return t;
};

const TimeOfDaySettings = ({doneAnimationRefHome}) => {
  const {deck, history, getFullDeck} = usePersistentStore();
  const [val1, setVal1] = useState<number>(0);

  return (
    <ImageBackground
      style={styles.cardFlexContainer}
      resizeMode={'cover'}
      source={AppBackground}>
      <SafeAreaView style={styles.container}>
        <Text>Morning</Text>
        {/* <Picker
          // style={[
          //   styles.dayOfYearWheelPicker,
          //   {
          //     backgroundColor:
          //       Card.cardDefinitions[modalCode]?.backOfCardColour,
          //   },
          // ]}
          selectedValue={val1}
          pickerData={pickerGenerator(24)}
          onValueChange={setVal1}
          // itemStyle={
          //   modalCode
          //     ? {
          //         color:
          //           chroma(
          //             Card.cardDefinitions[modalCode]?.backOfCardColour,
          //           ).get('lab.l') < 70
          //             ? 'gainsboro'
          //             : 'dimgrey',
          //       }
          //     : {}
          // }
          // textColor={
          //   modalCode
          //     ? chroma(Card.cardDefinitions[modalCode]?.backOfCardColour).get(
          //         'lab.l',
          //       ) < 70
          //       ? 'gainsboro'
          //       : 'dimgrey'
          //     : 'white'
          // }
        /> */}
        <Text>Afternoon</Text>
        <Text>Evening</Text>
        <Text>Night</Text>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default TimeOfDaySettings;

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
