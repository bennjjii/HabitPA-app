//Cards for demo
//Go to the gym
//Tidy room
//Work on music
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import Video from 'react-native-video';
import step1 from '../assets/video/step1.mp4';
import step2 from '../assets/video/step2.mp4';
import step34 from '../assets/video/step3+4.mp4';
import step6 from '../assets/video/step6.mp4';
import step7 from '../assets/video/step7.mp4';

import colours from '../assets/colours/colours';

const {width, height} = Dimensions.get('window');

const Footer = props => {
  return (
    <View
      style={{
        // height: height * 0.15,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
      {/* Indicator container */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        {/* Render indicator */}
        {props.slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              props.currentSlideIndex == index && {
                backgroundColor: 'white',
                width: 25,
              },
            ]}
          />
        ))}
      </View>

      {/* Render buttons */}
      <View style={{marginTop: 20, marginBottom: 20}}>
        {props.currentSlideIndex == props.slides.length - 1 ? (
          <View style={{height: 50}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => props.navigation.replace('HabitMage')}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  borderColor: 'white',
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                },
              ]}
              onPress={props.skip}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: 'white',
                }}>
                SKIP
              </Text>
            </TouchableOpacity>
            <View style={{width: 15}} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={props.goToNextSlide}
              style={styles.btn}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const Slide = ({item, videoRef}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        // backgroundColor: 'red',
        width: width,
      }}>
      <Video
        source={item.videoSource}
        resizeMode={'cover'}
        style={{
          height: '85%',
          width,
        }}
        ref={ref => (videoRef.current = ref)}
        repeat={item.repeat}
      />
      <View>
        <Text style={styles.title}>{item?.text}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = props => {
  const tutorialData = [
    {
      id: 0,
      text: `HabitMage is a spellbinding way to build habits. Let's take a quick look around...`,
      videoSource: step1,
      repeat: true,
    },
    {
      id: 1,
      text: `Each habit is represented by a card...`,
      videoSource: step2,
      repeat: true,
    },
    {
      id: 2,
      text: `Cards can be added to your deck in this tab...`,
      videoSource: step34,
      repeat: false,
    },
    {
      id: 3,
      text: `Let's add a habit that we want to do every week on specific days...`,
      videoSource: step34,
      repeat: true,
    },
    {
      id: 4,
      text: `The habit will now come up in our daily deck...`,
      videoSource: step6,
      repeat: false,
    },
    {
      id: 5,
      text: `We can play the card to the left to do the habit, or play it to the right to skip it for now...`,
      videoSource: step6,
      repeat: true,
    },
    {
      id: 6,
      text: `We can view our progress on our habits on the progress screen, as well as edit details...`,
      videoSource: step7,
      repeat: true,
    },
    {
      id: 7,
      text: `That's all! Have a look around!`,
      videoSource: step1,
      repeat: false,
    },
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  const flatListRef = useRef();
  const videoRefArr = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    videoRefArr[currentIndex].current.seek(0);
    setSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = slideIndex + 1;
    if (nextSlideIndex != tutorialData.length) {
      const offset = nextSlideIndex * width;
      flatListRef?.current.scrollToOffset({offset});
      setSlideIndex(slideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = tutorialData.length - 1;
    const offset = lastSlideIndex * width;
    flatListRef?.current.scrollToOffset({offset});
    setSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colours.backOfCardPalette[10],
      }}>
      {/* <Button
        title="reset"
        onPress={() => {
          videoRefArr[0].current.seek(0);
          console.log(videoRefArr[slideIndex].current);
        }}></Button> */}
      <FlatList
        ref={flatListRef}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.7}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={tutorialData}
        pagingEnabled
        renderItem={({item}) => (
          <Slide item={item} videoRef={videoRefArr[item.id]} />
        )}
      />
      <Footer
        slides={tutorialData}
        currentSlideIndex={slideIndex}
        goToNextSlide={goToNextSlide}
        skip={skip}
        navigation={props.navigation}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  title: {
    // color: colours.backOfCardPalette[6],
    color: colours.pixelTextFg1,
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'PublicPixel',
    // paddingHorizontal: 40,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
});
