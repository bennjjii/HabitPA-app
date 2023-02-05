import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  usePersistentStore,
  useNonPersistentStore,
} from '../services/zustandContext';

import ProgressBox from './ProgressBox';

import colours from '../assets/colours/colours';
import chroma from 'chroma-js';

import Card from './CardClass';

const {width, height} = Dimensions.get('screen');

import CardBackgroundImg from './../assets/Sprite-0001.png';
import TickGb from '../assets/tickgainsboro.png';
import EditGb from '../assets/editgainsboro.png';
import TrashGb from '../assets/trashgainsboro.png';
import TickDg from '../assets/tickdimgrey.png';
import EditDg from '../assets/editdimgrey.png';
import TrashDg from '../assets/trashdimgrey.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();

const BackOfCard = props => {
  const {deleteCardFromDeck} = usePersistentStore();
  const {
    cardUnderInspection,
    hideModalBackOfCard,
    switchToEditCard,
    switchToInAction,
  } = useNonPersistentStore();

  const [cardTheme, setCardTheme] = useState(undefined);

  useEffect(() => {
    if (props.card?.code) {
      if (
        chroma(Card.cardDefinitions[props.card.code].backOfCardColour).get(
          'lab.l',
        ) < 70
      ) {
        setCardTheme('dark');
      } else {
        setCardTheme('light');
      }
    }
  }, [props.card]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.card
            ? Card.cardDefinitions[props.card.code].backOfCardColour
            : 'white',
        },
      ]}>
      <Text style={styles.cardText}>{props.card?.name || '...'}</Text>

      <ProgressBox card={props.card} />
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            switchToInAction(props.card);
          }}>
          <Image
            source={cardTheme === 'dark' ? TickGb : TickDg}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            switchToEditCard(props.card);
          }}>
          <Image
            source={cardTheme === 'dark' ? EditGb : EditDg}
            style={[styles.icon, {marginRight: 5}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            deleteCardFromDeck(props.card);
            hideModalBackOfCard();
          }}>
          <Image
            source={cardTheme === 'dark' ? TrashGb : TrashDg}
            style={[styles.icon]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BackOfCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: (width * 0.9) / 0.7,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    padding: 45,
    paddingBottom: 30,
    margin: 10,
  },
  cardText: {
    color: '#ffffff',

    fontSize: 30,
    marginBottom: 30,
    fontFamily: 'PublicPixel',
  },
  //surely put these in a flex container??
  iconContainer: {
    // position: 'absolute',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.65,
    // top: width * 1.1,
  },
  icon: {
    width: 35,
    resizeMode: 'contain',
  },
});
