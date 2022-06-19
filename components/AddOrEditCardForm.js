//use react-hook-form, react native date time picker modal
//could use hoc to take very simple definition of each card's form
//and wrap it with all this stuff
//could toss state up from here via callbacks
//react native date pciker looks nice
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import NumberPlease from './CustomPicker/NumberPlease';
import {useForm, Controller} from 'react-hook-form';
import {useStore} from '../services/zustandContext';
import colours from '../assets/colours/colours';
import {TimeOfDay, Day} from '../utilities/enums';
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

// const atLeastOneDayOfWeek = v => {
//   return true;
// };

// const atLeastOneTimeOfDay = v => {
//   return true;
// };

const AddOrEditCardForm = props => {
  const {addCardToDeck, hideModalAddCard, modalCode, cardUnderInspection} =
    useStore();
  console.log('Card under inspection', cardUnderInspection);
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
      ? {...cardUnderInspection, numberOfTimes: '2'}
      : new Card(),
  });

  const [date, setDate] = useState(
    checkForParam(modalCode, 'date')
      ? cardUnderInspection
        ? cardUnderInspection.date
        : new Date()
      : undefined,
  );
  //set up year date spinner
  const initialValues =
    //needs resolving
    // cardUnderInspection
    // ? [
    //     {
    //       id: 'day',
    //       value: cardUnderInspection.dayOfYear.day
    //         ? cardUnderInspection.dayOfYear.day
    //         : 1,
    //     },
    //     {
    //       id: 'month',
    //       value: cardUnderInspection.dayOfYear.month
    //         ? cardUnderInspection.dayOfYear.month
    //         : 1,
    //     },
    //   ]
    // :
    [
      {id: 'day', value: 1},
      {id: 'month', value: 1},
    ];
  const [spinnerDate, setSpinnerDate] = useState(initialValues);
  //configuring spinners
  const [spinners, setSpinners] = useState([
    {id: 'day', label: '', min: 1, max: 31},
    {id: 'month', label: '', min: 1, max: 12},
  ]);
  //set up checkboxes
  const timesOfDay = [...Object.keys(TimeOfDay)];
  const daysOfWeek = [...Object.keys(Day)];

  //date, dayOfYear, are handled separately

  const onSubmit = formData => {
    console.log('formData', formData);
    hideModalAddCard();
    addCardToDeck(
      new Card({
        code: modalCode,
        name: formData.name,
        desc: formData.desc,
        backburner: formData.backburner,
        current: formData.current,
        parameters: {
          timeOfDay: {
            ...formData.timeOfDay,
          },
          dayOfWeek: {
            ...formData.dayOfWeek,
          },
          dayOfMonth: formData.dayOfMonth,
          dayOfYear: {
            day: checkForParam(modalCode, 'dayOfYear')
              ? spinnerDate[0].value
              : undefined,
            month: checkForParam(modalCode, 'dayOfYear')
              ? spinnerDate[1].value
              : undefined,
          },
          date: date,
          numberOfTimes: formData.numberOfTimes,
          periodInDays: formData.periodInDays,
        },
      }),
    );
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

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="card title"
              />
            )}
            name="name"
          />
          {errors.name && <Text>Name required</Text>}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="description of habit or task"
              />
            )}
            name="desc"
          />

          {checkForParam(modalCode, 'numberOfTimes') && (
            <View style={styles.numberOfTimesContainer}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  // validate: v => String(v).length === 1,
                  pattern: /^[0-9]$/g,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.textInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="number of times"
                  />
                )}
                name="numberOfTimes"
              />
              {errors.numberOfTimes && <Text>Number required</Text>}
            </View>
          )}

          {checkForParam(modalCode, 'periodInDays') && (
            <View style={styles.periodInDaysContainer}>
              <Controller
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
                name="periodInDays"
              />
              {errors.periodInDays && <Text>Number required</Text>}
            </View>
          )}

          {checkForParam(modalCode, 'dayOfWeek') && (
            <View style={styles.checkboxContainer}>
              {daysOfWeek.map(day => {
                return (
                  <>
                    <View style={styles.checkBoxView}>
                      <Controller
                        control={control}
                        name={`dayOfWeek.${day}`}
                        rules={{
                          validate: v => {
                            return Object.keys(getValues('dayOfWeek')).some(
                              day => {
                                return getValues('dayOfWeek')[day];
                              },
                            );
                          },
                        }}
                        render={({field: {onChange, value}}) => (
                          <CheckBox
                            disabled={false}
                            value={value}
                            onValueChange={e => {
                              onChange(e);
                            }}
                          />
                        )}
                      />
                      <Text style={styles.checkboxText}>{day}</Text>
                    </View>
                  </>
                );
              })}
              {errors.dayOfWeek && <Text>Please select a day of the week</Text>}
            </View>
          )}

          {checkForParam(modalCode, 'dayOfMonth') && (
            <View style={styles.dayOfMonth}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  // validate: v => String(v).length === 1,
                  pattern: /^(3[01]|[12][0-9]|[1-9])$/g,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="day of month"
                    style={styles.textInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="dayOfMonth"
              />
              {errors.dayOfMonth && <Text>Number required</Text>}
            </View>
          )}

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
              {timesOfDay.map(time => {
                return (
                  <>
                    <View style={styles.checkBoxView}>
                      <Controller
                        control={control}
                        name={`timeOfDay.${time}`}
                        rules={{
                          validate: v => {
                            return Object.keys(getValues('timeOfDay')).some(
                              day => {
                                return getValues('timeOfDay')[day];
                              },
                            );
                          },
                        }}
                        render={({field: {onChange, value}}) => (
                          <CheckBox
                            disabled={false}
                            value={value}
                            onValueChange={e => {
                              onChange(e);
                            }}
                          />
                        )}
                      />
                      <Text style={styles.checkboxText}>{time}</Text>
                    </View>
                  </>
                );
              })}
              {errors.timeOfDay && <Text>Please select a time of day</Text>}
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
});
