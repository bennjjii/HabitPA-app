//use react-hook-form, react native date time picker modal
//could use hoc to take very simple definition of each card's form
//and wrap it with all this stuff
//could toss state up from here via callbacks

import React, {Children, useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Keyboard,
  Text,
  Pressable,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import uuid from 'react-native-uuid';

import {useStore} from '../services/zustandContext';

import colours from '../assets/colours/colours';

import CommonInputCard from './TemplateCards/CommonInputCard';

const cardAspect = 400 / 280;
const cardWidth = 350;
const cardHeight = cardWidth * cardAspect;

const AddCardForm = ({children}) => {
  const {register, handleSubmit, formState, control, setValue} = useForm();
  const {addCardToDeck, hideModal, modalCode} = useStore();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [parameters, setParameters] = useState({
    timeOfDay: {
      Morning: false,
      Afternoon: false,
      Evening: false,
      Night: false,
    },
    dayOfWeek: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    },
    dayOfMonth: undefined, //make this an array at some point//
    dayOfYear: {
      day: undefined,
      month: undefined,
    }, //make this an array at some point//
    date: new Date(0),
    numberOfTimes: undefined,
    periodInDays: undefined,
    rolling: false,
    taperIn: false,
  });

  const onSubmit = () => {
    hideModal();

    addCardToDeck({
      code: modalCode,
      uuid: uuid.v4(),
      name,
      desc,
      parameters,
    });
  };

  //not DRY
  return (
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <CommonInputCard
          name={name}
          setName={setName}
          desc={desc}
          setDesc={setDesc}
          parameters={parameters}
          setParameters={setParameters}
        />
        <Button
          title="Submit"
          style={styles.submitButtton}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Pressable>
  );
};

export default AddCardForm;

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardHeight,
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
