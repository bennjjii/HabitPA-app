//use react-hook-form, react native date time picker modal
//could use hoc to take very simple definition of each card's form
//and wrap it with all this stuff
//could toss state up from here via callbacks
//react native date pciker looks nice

//need to convert between cardUnderInspection (.parameters)
//and formData/defaultValues == flat list

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Keyboard, Text, Pressable} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import NumberPlease from './CustomPicker/NumberPlease';
import {Picker} from '@react-native-picker/picker';
import BallPicker from './BallPicker';

import {useForm, Controller} from 'react-hook-form';
import {useStore} from '../services/zustandContext';
import colours from '../assets/colours/colours';
import Card from './CardClass';
const cardAspect = 400 / 280;
const cardWidth = 350;
const cardHeight = cardWidth * cardAspect;

const cardDefinitions = Card.cardDefinitions;
const checkForParam = (modalCode, paramName) => {
  return cardDefinitions[modalCode]
    ? Object.keys(cardDefinitions[modalCode]?.parameters).indexOf(paramName) !==
        -1
    : false;
};

//build an array of labels for BallPicker
const daysInMonthLabels = [];
for (let i = 0; i < 31; i++) {
  daysInMonthLabels.push(i + 1);
}

const AddOrEditCardForm = props => {
  useEffect(() => {
    console.log('Errors: ', errors);
  }, [errors]);

  const {
    addCardToDeck,
    editCard,
    hideModalAddCard,
    modalCode,
    cardUnderInspection,
  } = useStore();

  //console.log('Card under inspection', cardUnderInspection);
  const {
    register,
    handleSubmit,
    formState,
    formState: {errors},
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: cardUnderInspection
      ? {...cardUnderInspection} //need to convert types here for this to work
      : new Card(),
  });

  const [date, setDate] = useState(
    checkForParam(modalCode, 'date')
      ? cardUnderInspection
        ? cardUnderInspection.parameters.date // needs .parameters
        : new Date()
      : undefined,
  );
  //set up year date spinner
  const initialValues = cardUnderInspection
    ? [
        {
          id: 'day',
          value: cardUnderInspection.parameters.dayOfYear.day
            ? cardUnderInspection.parameters.dayOfYear.day
            : 1,
        },
        {
          id: 'month',
          value: cardUnderInspection.parameters.dayOfYear.month
            ? cardUnderInspection.parameters.dayOfYear.month
            : 1,
        },
      ]
    : [
        {id: 'day', value: 1},
        {id: 'month', value: 1},
      ];
  const [spinnerDate, setSpinnerDate] = useState(initialValues);
  //configuring spinners
  const [spinners, setSpinners] = useState([
    {id: 'day', label: '', min: 1, max: 31},
    {id: 'month', label: '', min: 1, max: 12},
  ]);

  const [numberOfTimes, setNumberOfTimes] = useState(
    cardUnderInspection
      ? cardUnderInspection.parameters.numberOfTimes
        ? cardUnderInspection.parameters.numberOfTimes.toString()
        : undefined
      : '1',
  );

  const [periodInDays, setPeriodInDays] = useState(
    cardUnderInspection
      ? cardUnderInspection.parameters.periodInDays
        ? cardUnderInspection.parameters.periodInDays.toString()
        : undefined
      : '1',
  );

  //date, dayOfYear, are handled separately

  const onSubmit = formData => {
    console.log('formData', formData);
    if (cardUnderInspection) {
      let cardToSubmit = {
        ...cardUnderInspection,
        name: formData.name,
        // desc: formData.desc,
        parameters: {
          timeOfDay: {
            ...formData.parameters.timeOfDay,
          },
          dayOfWeek: {
            ...formData.parameters.dayOfWeek,
          },
          dayOfMonth: formData.parameters.dayOfMonth, //make a custom picker for this
          dayOfYear: {
            day: checkForParam(modalCode, 'dayOfYear')
              ? spinnerDate[0].value
              : undefined,
            month: checkForParam(modalCode, 'dayOfYear')
              ? spinnerDate[1].value
              : undefined,
          },
          date: date,
          numberOfTimes: checkForParam(modalCode, 'numberOfTimes')
            ? +numberOfTimes
            : undefined, //need to convert back to string
          periodInDays: checkForParam(modalCode, 'periodInDays')
            ? +periodInDays
            : undefined,
        },
      };
      //edit the card
      console.log('Card to submit', cardToSubmit);
      editCard(cardToSubmit);
    } else {
      addCardToDeck(
        new Card({
          code: modalCode,
          name: formData.name,
          // desc: formData.desc,
          backburner: formData.backburner,
          current: formData.current,
          parameters: {
            timeOfDay: {
              ...formData.parameters.timeOfDay,
            },
            dayOfWeek: {
              ...formData.parameters.dayOfWeek,
            },
            dayOfMonth: formData.parameters.dayOfMonth, //make a custom picker for this
            dayOfYear: {
              day: checkForParam(modalCode, 'dayOfYear')
                ? spinnerDate[0].value
                : undefined,
              month: checkForParam(modalCode, 'dayOfYear')
                ? spinnerDate[1].value
                : undefined,
            },
            date: date,
            numberOfTimes: checkForParam(modalCode, 'numberOfTimes')
              ? +numberOfTimes
              : undefined, //need to convert back to string
            periodInDays: checkForParam(modalCode, 'periodInDays')
              ? +periodInDays
              : undefined,
          },
        }),
      );
    }
    hideModalAddCard();
  };

  useEffect(() => {
    // console.log('state', getValues());
    // console.log('errors', errors);
  }, [formState]);

  return (
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.codeText}>{modalCode}</Text>
          <Text style={styles.explanationText}>
            {cardDefinitions[modalCode]?.explanation}
          </Text>
          {/* name */}
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              //Change this to just an unoutlined text field with ios blue cursor
              <TextInput
                label={errors.name ? 'please enter a name' : 'habit name'}
                error={errors.name}
                dense={true}
                mode="outlined"
                style={styles.textInput2}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                // placeholder="card title"
              />
            )}
          />
          {errors.name && <Text>Name required</Text>}
          <View style={styles.pickerContainer}>
            {/* number of times */}
            {checkForParam(modalCode, 'numberOfTimes') && (
              <View style={styles.numberOfTimesContainer}>
                <Picker
                  selectedValue={numberOfTimes}
                  onValueChange={value => {
                    setNumberOfTimes(value);
                  }}>
                  {(() => {
                    let a = [];
                    for (let i = 1; i <= 9; i++) {
                      a.push(
                        <Picker.Item
                          label={i.toString()}
                          value={i.toString()}
                        />,
                      );
                    }
                    return a;
                  })()}
                </Picker>
              </View>
            )}

            {/* period in days */}
            {checkForParam(modalCode, 'periodInDays') && (
              <View style={styles.periodInDaysContainer}>
                <Picker
                  selectedValue={periodInDays}
                  onValueChange={value => {
                    setPeriodInDays(value);
                  }}>
                  {(() => {
                    let a = [];
                    for (let i = 1; i <= 90; i++) {
                      a.push(
                        <Picker.Item
                          label={i.toString()}
                          value={i.toString()}
                        />,
                      );
                    }
                    return a;
                  })()}
                </Picker>
                {/* <Controller
                  name="parameters.periodInDays"
                  control={control}
                  rules={{
                    required: true,
                    // validate: v => String(v).length === 1,
                    pattern: /^[0-9]$/g,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      placeholder="period in days"
                      style={styles.textInput}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.parameters?.periodInDays && (
                  <Text>Number required</Text>
                )} */}
              </View>
            )}
          </View>

          {checkForParam(modalCode, 'dayOfWeek') && (
            <View style={styles.checkboxContainer}>
              <Controller
                name={`parameters.dayOfWeek`}
                control={control}
                rules={{
                  validate: v => {
                    return Object.keys(getValues('parameters.dayOfWeek')).some(
                      day => {
                        return getValues('parameters.dayOfWeek')[day];
                      },
                    );
                  },
                }}
                render={({field: {onChange, value}}) => (
                  <BallPicker values={value} onValueChange={onChange} />
                )}
              />

              {errors.parameters?.dayOfWeek && (
                <Text>Please select a day of the week</Text>
              )}
            </View>
          )}

          {/* day of month */}
          {checkForParam(modalCode, 'dayOfMonth') && (
            <View style={styles.dayOfMonth}>
              <Controller
                name="parameters.dayOfMonth"
                control={control}
                rules={{
                  validate: v => {
                    return Object.keys(v).some(key => {
                      return v[key];
                    });
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <BallPicker values={value} onValueChange={onChange} />
                )}
              />
              {errors.parameters?.dayOfMonth && (
                <Text>Please select one or more days</Text>
              )}
            </View>
          )}

          {/* day of year */}
          {checkForParam(modalCode, 'dayOfYear') && (
            <View style={styles.dayOfYear}>
              <NumberPlease
                pickers={spinners}
                values={spinnerDate}
                onChange={values => {
                  console.log(values['month']);
                  setSpinnerDate(values);
                  switch (values['month']) {
                    case 1:
                      setSpinners(state => [
                        {...state[0], max: 31},
                        {...state[1]},
                      ]);
                      break;
                    case 2:
                      setSpinners(state => [
                        {...state[0], max: 28},
                        {...state[1]},
                      ]);
                      break;
                    case 3:
                      setSpinners(state => [
                        {...state[0], max: 31},
                        {...state[1]},
                      ]);
                      break;
                    case 4:
                      setSpinners(state => [
                        {...state[0], max: 30},
                        {...state[1]},
                      ]);
                      break;
                    case 5:
                      setSpinners(state => [
                        {...state[0], max: 31},
                        {...state[1]},
                      ]);
                      break;
                    case 6:
                      setSpinners(state => [
                        {...state[0], max: 30},
                        {...state[1]},
                      ]);
                      break;
                    case 7:
                      setSpinners(state => [
                        {...state[0], max: 31},
                        {...state[1]},
                      ]);
                      break;
                    case 8:
                      setSpinners(state => [
                        {...state[0], max: 31},
                        {...state[1]},
                      ]);
                      break;
                    case 9:
                      setSpinners(state => [
                        {...state[0], max: 30},
                        {...state[1]},
                      ]);
                      break;
                    case 10:
                      setSpinners(state => [
                        {...state[0], max: 31},
                        {...state[1]},
                      ]);
                      break;
                    case 11:
                      setSpinners(state => [
                        {...state[0], max: 30},
                        {...state[1]},
                      ]);
                      break;
                    case 12:
                      setSpinners(state => [
                        {...state[0], max: 31},
                        {...state[1]},
                      ]);
                      break;
                  }
                }}
              />
            </View>
          )}

          {/* date */}
          {checkForParam(modalCode, 'date') && (
            <View style={styles.date}>
              <DateTimePicker
                display="spinner"
                minimumDate={new Date()}
                onChange={(event, date) => {
                  setDate(date);
                }}
                value={date}
              />
            </View>
          )}

          {checkForParam(modalCode, 'timeOfDay') && (
            <View style={styles.checkboxContainer}>
              <Controller
                name={`parameters.timeOfDay`}
                control={control}
                rules={{
                  validate: v => {
                    return Object.keys(getValues('parameters.timeOfDay')).some(
                      day => {
                        return getValues('parameters.timeOfDay')[day];
                      },
                    );
                  },
                }}
                render={({field: {onChange, value}}) => (
                  <BallPicker values={value} onValueChange={onChange} />
                )}
              />

              {errors.parameters?.timeOfDay && (
                <Text>Please select a time of day</Text>
              )}
            </View>
          )}
        </View>
        <Button onPress={handleSubmit(onSubmit)}>
          {cardUnderInspection ? 'SAVE' : 'ADD NEW CARD'}
        </Button>
      </View>
    </Pressable>
  );
};

export default AddOrEditCardForm;

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: '#222222',
    backgroundColor: colours.foreground,
    justifyContent: 'space-between',
    paddingVertical: 50,
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
  form: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: colours.background,
    width: 200,
    margin: 2,
    borderWidth: 1,
    borderColor: colours.text,
    borderRadius: 5,
    padding: 5,
  },
  textInput2: {
    width: 250,
  },
  numberOfTimesContainer: {
    flex: 1,
  },
  periodInDaysContainer: {
    flex: 1,
  },
  date: {
    width: 270,
  },
  checkboxContainer: {
    marginHorizontal: 30,
    marginTop: 20,
    //backgroundColor: 'green',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    paddingHorizontal: 5,
  },
  checkboxText: {
    paddingLeft: 0,
  },
  cardTitleText: {
    fontSize: 20,
    marginBottom: 30,
  },
  explanationText: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  codeText: {
    fontSize: 25,
    marginBottom: 10,
    color: colours.text,
  },
  pickerContainer: {
    flexDirection: 'row',
    width: 240,
    justifyContent: 'space-around',
    flexBasis: 1,
    flexGrow: 1,
  },
});
