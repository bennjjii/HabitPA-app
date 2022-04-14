import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useStore} from '../services/zustandContext';
import filterCards from '../utilities/filterCards';

const Tab3 = () => {
  const {deck, getFilteredDeck} = useStore();

  return (
    <SafeAreaView style={styles.container}>
      {deck.map(card => {
        return <Text>{card.name}</Text>;
      })}
      <Text>...</Text>
      {filteredDeck.map(card => {
        return <Text>{card.name}</Text>;
      })}
      <Text>...</Text>
      {getFilteredDeck().map(card => {
        return <Text>{card.name}</Text>;
      })}
    </SafeAreaView>
  );
};

export default Tab3;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    margin: 20,
  },
});
