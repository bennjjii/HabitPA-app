import {StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import {Context as AuthContext} from '../services/Auth';

const PossibleActivitiesScreen = () => {
  const {state, signout} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.viewWrapper}>
      <Text>Tab1</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          signout();
        }}>
        <Text style={styles.textStyle}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PossibleActivitiesScreen;

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 3,
  },
  textStyle: {
    color: 'white',
  },
});
