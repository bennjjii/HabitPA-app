import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useStore} from '../services/zustandContext';

const Tab3 = () => {
  const {deck, getFilteredDeck} = useStore();

  return (
    <SafeAreaView style={styles.container}>
      {deck.map(card => {
        return <Text key={card.uuid}>{card.name}</Text>;
      })}
      <Text>...</Text>

      <Text>...</Text>
      {getFilteredDeck().map(card => {
        return <Text key={card.uuid}>{card.name}</Text>;
      })}
      <TouchableOpacity
        style={{width: 100, height: 50, backgroundColor: 'orange'}}
        onPress={() => {
          console.log('first');
          useStore.persist.clearStorage();
        }}
      />
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
