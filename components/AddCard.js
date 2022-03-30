import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import colours from '../assets/colours/colours';
import cardDefinitions from '../assets/data/cardDefinitions';

const cardAspect = 400 / 280;
const cardWidth = 160;
const cardHeight = cardWidth * cardAspect;

const TemplateCard = props => {
  return (
    <View style={styles.templateCard}>
      <Text style={styles.cardText}>{props.name}</Text>
    </View>
  );
};

const AddCard = () => {
  console.log(cardDefinitions);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrView}>
        <View style={styles.cardFlexContainer}>
          {Object.keys(cardDefinitions).map((card, i) => {
            return <TemplateCard name={cardDefinitions[card].name} key={cardDefinitions[card].code}/>;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: cardWidth,
    height: cardHeight,
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
  cardText: {
    color: colours.text,
  },
});
