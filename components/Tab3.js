import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useStore} from '../services/zustandContext';

const Tab3 = () => {
  const {deck, getFilteredDeck} = useStore();

  return (
    <SafeAreaView style={styles.container}>
      {deck.map(card => {
        return <Text>{card.name}</Text>;
      })}
      <Text>...</Text>

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
