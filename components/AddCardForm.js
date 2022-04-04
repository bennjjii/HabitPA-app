//use react-hook-form, react native date time picker modal
//could use hoc to take very simple definition of each card's form
//and wrap it with all this stuff
//could toss state up from here via callbacks

import React, {Children} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';

import colours from '../assets/colours/colours';

const AddCardForm = ({children}) => {
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <View style={styles.container}>
      {Children.map(children, child => {
        console.log(child.props.children);
        return child;
      })}
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};

export default AddCardForm;

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 400,
    backgroundColor: '#222222',
    backgroundColor: colours.foreground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
