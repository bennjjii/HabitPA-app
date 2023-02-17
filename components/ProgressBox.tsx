import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card, {CardClass} from './CardClass';
import chroma from 'chroma-js';
import {HistoryItem} from '../services/zustandContext';

interface ProgressBoxProps {
  cardInFocus: CardClass;
  history: HistoryItem[];
}

const ProgressBox: React.FC<ProgressBoxProps> = ({cardInFocus, history}) => {
  const [contractText, setContractText] = useState('');
  const [dataToRender, setDataToRender] = useState(null);
  const [habitCoefficient, setHabitCoefficient] = useState(undefined);

  //terrible bodge because the card functions were designed so badly
  useEffect(() => {
    const textColor =
      chroma(Card.cardDefinitions[cardInFocus.code]?.backOfCardColour).get(
        'lab.l',
      ) < 70
        ? 'gainsboro'
        : 'dimgrey';
    setContractText(
      //props{card}
      Card.cardDefinitions[cardInFocus.code].contractRenderFunction({
        card: cardInFocus,
      }),
    );
    setDataToRender(
      //props, history, color
      Card.cardDefinitions[cardInFocus.code].progressRenderFunction(
        {card: cardInFocus, history: history},
        history,
        textColor,
      ),
    );
    setHabitCoefficient(
      //card, history, parameters
      Card.cardDefinitions[cardInFocus.code].progressCoeffFunction(
        cardInFocus,
        history,
        cardInFocus.parameters,
      ),
    );
  }, [cardInFocus, history]);

  return (
    <>
      <Text
        style={[
          styles.contractText,
          cardInFocus?.code
            ? {
                color:
                  chroma(
                    Card.cardDefinitions[cardInFocus.code]?.backOfCardColour,
                  ).get('lab.l') < 70
                    ? 'gainsboro'
                    : 'dimgrey',
              }
            : {},
        ]}>
        {contractText + '\n'}
      </Text>
      <Text
        style={[
          styles.progressText,
          cardInFocus?.code
            ? {
                color:
                  chroma(
                    Card.cardDefinitions[cardInFocus.code]?.backOfCardColour,
                  ).get('lab.l') < 70
                    ? 'gainsboro'
                    : 'dimgrey',
              }
            : {},
        ]}>
        Progress...
      </Text>
      <View style={styles.progressDataStyle}>{dataToRender}</View>
      <Text
        style={[
          styles.levelText,
          cardInFocus?.code
            ? {
                color:
                  chroma(
                    Card.cardDefinitions[cardInFocus.code]?.backOfCardColour,
                  ).get('lab.l') < 70
                    ? 'gainsboro'
                    : 'dimgrey',
              }
            : {},
        ]}>
        Level: {habitCoefficient}
      </Text>
    </>
  );
};

export default ProgressBox;

const styles = StyleSheet.create({
  contractText: {
    fontFamily: 'PublicPixel',
  },
  levelText: {
    fontFamily: 'PublicPixel',
  },
  progressText: {
    fontFamily: 'PublicPixel',
  },
  progressDataStyle: {
    flexDirection: 'row',
    // backgroundColor: 'green',
  },
});
