import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {usePersistentStore} from '../services/zustandContext';
import Card from './CardClass';
import chroma from 'chroma-js';

const ProgressBox = props => {
  const {history} = usePersistentStore();

  const [contractText, setContractText] = useState('');
  const [dataToRender, setDataToRender] = useState(null);
  const [habitCoefficient, setHabitCoefficient] = useState(undefined);

  useEffect(() => {
    //TODO not used vv
    _history = history.filter(instance => {
      return instance.uuid == props.card.uuid;
    });
    console.log('props.card.code', props.card.code);
    const textColor =
      chroma(Card.cardDefinitions[props.card.code]?.backOfCardColour).get(
        'lab.l',
      ) < 70
        ? 'gainsboro'
        : 'dimgrey';
    setContractText(
      Card.cardDefinitions[props.card.code].contractRenderFunction(props),
    );
    setDataToRender(
      Card.cardDefinitions[props.card.code].progressRenderFunction(
        props,
        history,
        textColor,
      ),
    );
    setHabitCoefficient(
      Card.cardDefinitions[props.card.code].progressCoeffFunction(
        props.card,
        history,
        props.card.parameters,
      ),
    );
  }, []);

  return (
    <>
      <Text
        style={[
          styles.contractText,
          props.card?.code
            ? {
                color:
                  chroma(
                    Card.cardDefinitions[props.card.code]?.backOfCardColour,
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
          props.card?.code
            ? {
                color:
                  chroma(
                    Card.cardDefinitions[props.card.code]?.backOfCardColour,
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
          props.card?.code
            ? {
                color:
                  chroma(
                    Card.cardDefinitions[props.card.code]?.backOfCardColour,
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
