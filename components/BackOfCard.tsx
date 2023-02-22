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
  HistoryItem,
} from '../services/zustandContext';

import ProgressBox from './ProgressBox';

import colours from '../assets/colours/colours';
import chroma from 'chroma-js';

import Card, {CardClass} from './CardClass';

const {width, height} = Dimensions.get('screen');

const TickGb = require('../assets/tickgainsboro.png');
const EditGb = require('../assets/editgainsboro.png');
const TrashGb = require('../assets/trashgainsboro.png');
const TickDg = require('../assets/tickdimgrey.png');
const EditDg = require('../assets/editdimgrey.png');
const TrashDg = require('../assets/trashdimgrey.png');

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Done from './Done';
FontAwesome.loadFont();

interface BackOfCardProps {
  cardInFocus: CardClass;
  history: HistoryItem[];
  doneAnimationRefHome: any;
}

const BackOfCard: React.FC<BackOfCardProps> = ({
  cardInFocus,
  history,
  doneAnimationRefHome,
}) => {
  const {deleteCardFromDeck, pushCardToHistory} = usePersistentStore();
  const {
    hideModal,
    switchFromBackOfCardModalToAddOrEdit,
    runDoneAnimation,
    modalMode,
  } = useNonPersistentStore();
  const doneRefModal = useRef(null);

  const [cardTheme, setCardTheme] = useState(undefined);

  useEffect(() => {
    if (cardInFocus.code) {
      if (
        chroma(Card.cardDefinitions[cardInFocus.code].backOfCardColour).get(
          'lab.l',
        ) < 70
      ) {
        setCardTheme('dark');
      } else {
        setCardTheme('light');
      }
    }
  }, [cardInFocus]);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: cardInFocus
              ? Card.cardDefinitions[cardInFocus.code].backOfCardColour
              : 'white',
          },
        ]}>
        <Text style={styles.cardText}>
          {(cardInFocus.name &&
            (cardInFocus.name.length < 33
              ? cardInFocus.name
              : cardInFocus.name.slice(0, 33) + '...')) ||
            '...'}
        </Text>

        <ProgressBox cardInFocus={cardInFocus} history={history} />
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              //TODO implement inaction from here
              // pushCardToHistory(cardInFocus);
              // runDoneAnimation();
              if (modalMode === 'BACK_OF_CARD') {
                doneRefModal.current.log();
                doneRefModal.current.triggerDoneAnimation();
              } else {
                doneAnimationRefHome.current.triggerDoneAnimation();
              }
            }}>
            <Image
              source={cardTheme === 'dark' ? TickGb : TickDg}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              switchFromBackOfCardModalToAddOrEdit(cardInFocus);
            }}>
            <Image
              source={cardTheme === 'dark' ? EditGb : EditDg}
              style={[styles.icon, {marginRight: 5}]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteCardFromDeck(cardInFocus);
              hideModal();
            }}>
            <Image
              source={cardTheme === 'dark' ? TrashGb : TrashDg}
              style={[styles.icon]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Done source="BACK_OF_CARD" ref={doneRefModal} />
    </>
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
