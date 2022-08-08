//use react-hook-form, react native date time picker modal
//could use hoc to take very simple definition of each card's form
//and wrap it with all this stuff
//could toss state up from here via callbacks
//react native date pciker looks nice

//need to convert between cardUnderInspection (.parameters)
//and formData/defaultValues == flat list

import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  Pressable,
  Dimensions,
  ImageBackground,
  TextInput as TextInput,
  Platform,
} from 'react-native';
import {Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Picker, DatePicker} from '@davidgovea/react-native-wheel-datepicker';
import CardBackgroundImg from './../assets/Sprite-0001.png';

import BallPicker from './BallPicker';

import {useForm, Controller} from 'react-hook-form';
import {useStore} from '../services/zustandContext';
import colours from '../assets/colours/colours';
import chroma from 'chroma-js';
import Card from './CardClass';
const {width, height} = Dimensions.get('screen');
const cardDefinitions = Card.cardDefinitions;
const checkForParam = (modalCode, paramName) => {
  return cardDefinitions[modalCode]
    ? Object.keys(cardDefinitions[modalCode]?.parameters).indexOf(paramName) !==
        -1
    : false;
};
const pickerGenerator = count => {
  const t = [];
  for (let i = 1; i < count + 1; i++) {
    t.push(i);
  }
  return t;
};
const shortNames = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
  Morning: 'Morn',
  Afternoon: 'Afternoon',
  Evening: 'Eve',
  Bedtime: 'Bed',
};

// const wheelPickerGenerator = count => {
//   const t = [];
//   for (let i = 1; i < count + 1; i++) {
//     t.push({label: i.toString(), value: i.toString()});
//   }
//   return t;
// };

const AddOrEditCardForm = props => {
  const renderCounterAddOrEditCard = useRef(Math.random());
  let currentSubTutorialStep = 0;
  // useEffect(() => {
  //   console.log('Errors: ', errors);
  //   console.log('screen', Dimensions.get('screen'));
  // }, [errors]);

  const runTutorial = () => {
    const currentDay = new Date().getDay(); //0 is Sunday
    const steps = [
      () => {
        setValue('name', 'G');
      },
      () => {
        setValue('name', 'Go');
      },
      () => {
        setValue('name', 'Go ');
      },
      () => {
        setValue('name', 'Go t');
      },
      () => {
        setValue('name', 'Go to');
      },
      () => {
        setValue('name', 'Go to ');
      },
      () => {
        setValue('name', 'Go to t');
      },
      () => {
        setValue('name', 'Go to th');
      },
      () => {
        setValue('name', 'Go to the');
      },
      () => {
        setValue('name', 'Go to the ');
      },
      () => {
        setValue('name', 'Go to the g');
      },
      () => {
        setValue('name', 'Go to the gy');
      },
      () => {
        setValue('name', 'Go to the gym');
      },
      () => {
        // setValue('parameters.dayOfWeek', {
        //   Monday: currentDay == 1,
        //   Tuesday: currentDay == 2,
        //   Wednesday: currentDay == 3,
        //   Thursday: currentDay == 4,
        //   Friday: currentDay == 5,
        //   Saturday: currentDay == 6,
        //   Sunday: currentDay == 0,
        // });
      },
      () => {
        // handleSubmit(onSubmit);
      },
    ];
    // if (tutorialFillInCard) {
    let mInterval = setInterval(() => {
      steps[currentSubTutorialStep]();
      currentSubTutorialStep++;
      if (currentSubTutorialStep == steps.length - 1) {
        console.log('currentSubTutorialStep', currentSubTutorialStep);
        hideModalAddCard();
        clearInterval(mInterval);
        unblockTutorialSkip();

        let mTimeout2 = setTimeout(() => {
          console.log('move to next tutorial step');

          moveToNextTutorialStep();
          endTutorialFillInCard();
          clearTimeout(mTimeout2);
        }, 1000);
      }
    }, 300);
    // }
  };

  useEffect(() => {
    console.log(renderCounterAddOrEditCard);
    let mTimeout = setTimeout(() => {
      console.log('tutorialFillInCard', tutorialFillInCard);
      if (tutorialFillInCard) {
        runTutorial();
        console.log('sub tutorial started');
      }
      clearTimeout(mTimeout);
    }, 1000);
  }, [tutorialFillInCard]);

  const {
    addCardToDeck,
    editCard,
    hideModalAddCard,
    modalCode,
    cardUnderInspection,
    tutorialFillInCard,
    unblockTutorialSkip,
    moveToNextTutorialStep,
    endTutorialFillInCard,
  } = useStore();

  const [textColourStyle, setTextColourStyle] = useState({});
  const [textColour, setTextColour] = useState('white');

  useEffect(() => {
    if (modalCode) {
      setTextColourStyle({
        color:
          chroma(Card.cardDefinitions[modalCode]?.backOfCardColour).get(
            'lab.l',
          ) < 70
            ? 'gainsboro'
            : 'dimgrey',
      });
      setTextColour(
        chroma(Card.cardDefinitions[modalCode]?.backOfCardColour).get('lab.l') <
          70
          ? 'gainsboro'
          : 'dimgrey',
      );
    }
  }, [modalCode]);

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
        ? cardUnderInspection.parameters.date
        : new Date()
      : undefined,
  );
  //date validation
  const [dateError, setDateError] = useState(false);
  useEffect(() => {
    setDateError(false);
  }, [date]);

  //set up year date spinner
  const [dayOfYearDay, setDayOfYearDay] = useState(
    cardUnderInspection?.parameters.dayOfYear.day
      ? cardUnderInspection.parameters.dayOfYear.day
      : 1,
  );
  const [dayOfYearDayComponent, setDayOfYearDayComponent] = useState(
    <Picker
      style={[
        styles.dayOfYearWheelPicker,
        {
          backgroundColor: Card.cardDefinitions[modalCode]?.backOfCardColour,
        },
      ]}
      selectedValue={dayOfYearDay}
      pickerData={pickerGenerator(28)}
      onValueChange={setDayOfYearDay}
      itemStyle={
        modalCode
          ? {
              color:
                chroma(Card.cardDefinitions[modalCode]?.backOfCardColour).get(
                  'lab.l',
                ) < 70
                  ? 'gainsboro'
                  : 'dimgrey',
            }
          : {}
      }
      textColor={
        modalCode
          ? chroma(Card.cardDefinitions[modalCode]?.backOfCardColour).get(
              'lab.l',
            ) < 70
            ? 'gainsboro'
            : 'dimgrey'
          : 'white'
      }
    />,
  );
  const [dayOfYearMonth, setDayOfYearMonth] = useState(
    cardUnderInspection?.parameters.dayOfYear.month
      ? cardUnderInspection.parameters.dayOfYear.month
      : 1,
  );

  //set up other spinners

  const [numberOfTimes, setNumberOfTimes] = useState(
    cardUnderInspection
      ? cardUnderInspection.parameters.numberOfTimes
        ? cardUnderInspection.parameters.numberOfTimes
        : undefined
      : 1,
  );

  const numberOfTimesCB = useCallback(value => {
    console.log(value);
    setNumberOfTimes(value);
  }, []);

  const [periodInDays, setPeriodInDays] = useState(
    cardUnderInspection
      ? cardUnderInspection.parameters.periodInDays
        ? cardUnderInspection.parameters.periodInDays
        : undefined
      : 1,
  );

  const periodInDaysCB = useCallback(value => {
    console.log(value);
    setPeriodInDays(value);
  }, []);

  //date, dayOfYear, are handled separately

  const onSubmit = formData => {
    if (date && date.getTime() < new Date().getTime()) {
      setDateError(true);
      return;
    }
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
              ? dayOfYearDay
              : undefined,
            month: checkForParam(modalCode, 'dayOfYear')
              ? dayOfYearMonth
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
      console.log('formDataNew', formData);
      console.log(checkForParam(modalCode, 'dayOfYear'));
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
                ? dayOfYearDay
                : undefined,
              month: checkForParam(modalCode, 'dayOfYear')
                ? dayOfYearMonth
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
      <View
        style={[
          styles.container,
          {backgroundColor: Card.cardDefinitions[modalCode]?.backOfCardColour},
        ]}>
        {/* <View style={styles.form}> */}
        {/* <Text style={styles.codeText}>{modalCode}</Text> */}
        <View style={styles.topSection}>
          <Text style={[styles.explanationText, textColourStyle]}>
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
              <TextInput
                style={[
                  styles.habitNameStyle2,
                  modalCode
                    ? {
                        backgroundColor: chroma(
                          Card.cardDefinitions[modalCode]?.backOfCardColour,
                        )
                          .darken(0.5)
                          .hex(),
                      }
                    : {},
                  errors.name ? {color: 'red'} : {},
                  textColourStyle,
                ]}
                placeholder={errors.name ? 'enter a name...' : 'habit name'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View style={styles.pickerContainer}>
          {/* number of times */}
          {checkForParam(modalCode, 'numberOfTimes') && (
            <View style={styles.numberOfTimesContainer}>
              <Picker
                style={[
                  styles.numberOfTimes,
                  {
                    backgroundColor:
                      Card.cardDefinitions[modalCode]?.backOfCardColour,
                  },
                ]}
                selectedValue={numberOfTimes}
                pickerData={pickerGenerator(9)}
                onValueChange={numberOfTimesCB}
                itemStyle={textColourStyle}
                textColor={textColour}
              />
              <Text style={[styles.DoYLabel, textColourStyle]}>times</Text>
            </View>
          )}

          {/* period in days */}
          {checkForParam(modalCode, 'periodInDays') && (
            <View style={styles.periodInDaysContainer}>
              <Picker
                style={[
                  styles.periodInDays,
                  {
                    backgroundColor:
                      Card.cardDefinitions[modalCode]?.backOfCardColour,
                  },
                ]}
                selectedValue={periodInDays}
                pickerData={pickerGenerator(90)}
                onValueChange={periodInDaysCB}
                itemStyle={textColourStyle}
                textColor={textColour}
              />
              <Text style={[styles.DoYLabel, textColourStyle]}>days</Text>
            </View>
          )}
        </View>
        {/* day of week */}
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
                <BallPicker
                  values={value}
                  onValueChange={onChange}
                  textStyle={{fontFamily: 'PublicPixel'}}
                  altLabels={shortNames}
                  contextColour={
                    Card.cardDefinitions[modalCode]?.backOfCardColour
                  }
                />
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
                <BallPicker
                  values={value}
                  onValueChange={onChange}
                  contextColour={
                    Card.cardDefinitions[modalCode]?.backOfCardColour
                  }
                />
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
            <View style={styles.DoYLabelContainer}>
              {dayOfYearDayComponent}
              <Text style={[styles.DoYLabel, textColourStyle]}>day</Text>
            </View>
            <View style={styles.DoYLabelContainer}>
              <Picker
                style={[
                  styles.monthOfYearWheelPicker,
                  {
                    backgroundColor:
                      Card.cardDefinitions[modalCode]?.backOfCardColour,
                  },
                ]}
                selectedValue={dayOfYearMonth}
                pickerData={pickerGenerator(12)}
                itemStyle={textColourStyle}
                textColor={textColour}
                onValueChange={value => {
                  setDayOfYearMonth(value);
                  console.log(value);
                  switch (value) {
                    case 1:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(31)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );

                      break;
                    case 2:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(28)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );

                      break;
                    case 3:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(31)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );
                      break;
                    case 4:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(30)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );

                      break;
                    case 5:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(31)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );

                      break;
                    case 6:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(30)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );

                      break;
                    case 7:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(31)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );

                      break;
                    case 8:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(31)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );

                      break;
                    case 9:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(30)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );

                      break;
                    case 10:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(31)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );
                      break;
                    case 11:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(30)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );

                      break;
                    case 12:
                      setDayOfYearDayComponent(
                        <Picker
                          style={[
                            styles.dayOfYearWheelPicker,
                            {
                              backgroundColor:
                                Card.cardDefinitions[modalCode]
                                  ?.backOfCardColour,
                            },
                          ]}
                          selectedValue={dayOfYearDay}
                          pickerData={pickerGenerator(31)}
                          onValueChange={setDayOfYearDay}
                          itemStyle={textColourStyle}
                          textColor={textColour}
                        />,
                      );
                      break;
                  }
                }}
              />
              <Text style={[styles.DoYLabel, textColourStyle]}>month</Text>
            </View>
          </View>
        )}

        {/* date */}
        {checkForParam(modalCode, 'date') && (
          <>
            <View style={styles.date}>
              {/* <DateTimePicker
              display="spinner"
              minimumDate={new Date()}
              onChange={(event, date) => {
                setDate(date);
              }}
              value={date}
            /> */}
              {Platform.OS !== 'ios' ? (
                <DatePicker
                  mode={'date'}
                  minimumDate={new Date()}
                  date={date}
                  onDateChange={date => {
                    setDate(date);
                  }}
                  style={{
                    backgroundColor:
                      Card.cardDefinitions[modalCode]?.backOfCardColour,
                  }}
                  itemStyle={textColourStyle}
                  textColor={textColour}
                />
              ) : (
                <DateTimePicker
                  display="spinner"
                  minimumDate={new Date()}
                  onChange={(event, date) => {
                    setDate(date);
                  }}
                  value={date}
                  textColor={textColour}
                />
              )}
            </View>
            {dateError && (
              <Text style={[styles.dateErrorText, textColourStyle]}>
                date must be in future
              </Text>
            )}
          </>
        )}

        {checkForParam(modalCode, 'timeOfDay') && (
          <View style={styles.checkboxContainer}>
            <Controller
              name={`parameters.timeOfDay`}
              control={control}
              // rules={{
              //   validate: v => {
              //     return Object.keys(getValues('parameters.timeOfDay')).some(
              //       day => {
              //         return getValues('parameters.timeOfDay')[day];
              //       },
              //     );
              //   },
              // }}
              render={({field: {onChange, value}}) => (
                <BallPicker
                  values={value}
                  onValueChange={onChange}
                  textStyle={{fontFamily: 'PublicPixel'}}
                  contextColour={
                    Card.cardDefinitions[modalCode]?.backOfCardColour
                  }
                  // altLabels={shortNames}
                />
              )}
            />

            {/* {errors.parameters?.timeOfDay && (
                <Text>Please select a time of day</Text>
              )} */}
          </View>
        )}
        {/* </View> */}
        <Button
          labelStyle={styles.submitButton}
          onPress={handleSubmit(onSubmit)}>
          {cardUnderInspection ? 'SAVE' : 'ADD NEW CARD'}
        </Button>
      </View>
    </Pressable>
  );
};

export default AddOrEditCardForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width * 0.9,
    height: (width * 0.9) / 0.7,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 30,
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
  topSection: {
    alignItems: 'center',
    width: '100%',
  },
  explanationText: {
    marginBottom: 20,
    fontFamily: 'PublicPixel',
  },

  habitNameStyle2: {
    backgroundColor: 'white',
    // width: width * 0.67,
    width: '95%',
    fontFamily: 'PublicPixel',
    padding: 10,
    // borderWidth: 4,
    // borderColor: 'grey',
    borderRadius: 0,
  },
  numberOfTimesContainer: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  numberOfTimes: {
    width: 120,
    height: 190,
  },
  periodInDaysContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  periodInDays: {
    width: 120,
    height: 190,
  },

  date: {
    width: 270,
  },
  checkboxContainer: {
    // marginHorizontal: 30,
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

  codeText: {
    fontSize: 25,
    marginBottom: 10,
    color: colours.text,
  },
  pickerContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-around',

    // flexGrow: 1,
  },
  dayOfYear: {
    flexDirection: 'row',
  },
  submitButton: {
    fontFamily: 'PublicPixel',
  },
  dayOfYearWheelPicker: {
    // backgroundColor: 'white',
    width: 120,
    height: 190,
  },
  monthOfYearWheelPicker: {
    // backgroundColor: 'white',
    width: 120,
    height: 190,
  },
  DoYLabelContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  DoYLabel: {
    fontFamily: 'PublicPixel',
    marginTop: 20,
  },
  dateErrorText: {
    color: 'white',
    fontFamily: 'PublicPixel',
    fontSize: 10,
  },
});
