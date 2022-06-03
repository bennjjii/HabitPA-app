import uuid from 'react-native-uuid';

const Day = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday',
};

const TimeOfDay = {
  Morning: 'Morning',
  Afternoon: 'Afternoon',
  Evening: 'Evening',
  Night: 'Night',
};

const Code = {
  ED: 'ED',
  XpD: 'XpD',
  EW: 'EW',
  XpW: 'XpW',
  RxW: 'RxW',
  EM: 'EM',
  XpM: 'XpM',
  RxM: 'RxM',
  XiY: 'XiY',
  XiT: 'XiT',
  SpT: 'SpT',
  DL: 'DL',
  EY: 'EY',
  XpY: 'XpY',
  RxY: 'RxY',
  AsP: 'AsP',
};

export default class Card {
  constructor(newCardData) {
    //uuid
    this.uuid = uuid.v4();
    //metadata
    this.created = new Date();
    //flags
    this.current = true;
    this.backburner = newCardData.backburner;
    this.code = newCardData.code;
    this.name = newCardData.name;
    this.desc = newCardData.desc;
    //parameters
    this.parameters = {
      timeOfDay: {
        Morning: newCardData.parameters.timeOfDay.Morning,
        Afternoon: newCardData.parameters.timeOfDay.Afternoon,
        Evening: newCardData.parameters.timeOfDay.Evening,
        Night: newCardData.parameters.timeOfDay.Night,
      },
      dayOfWeek: {
        Monday: newCardData.parameters.dayOfWeek.Monday,
        Tuesday: newCardData.parameters.dayOfWeek.Tuesday,
        Wednesday: newCardData.parameters.dayOfWeek.Wednesday,
        Thursday: newCardData.parameters.dayOfWeek.Thursday,
        Friday: newCardData.parameters.dayOfWeek.Friday,
        Saturday: newCardData.parameters.dayOfWeek.Saturday,
        Sunday: newCardData.parameters.dayOfWeek.Sunday,
      },
      dayOfMonth: newCardData.parameters.dayOfMonth,
      dayOfYear: {
        day: newCardData.parameters.dayOfYear.day,
        month: newCardData.parameters.dayOfYear.month,
      },
      date: newCardData.parameters.date,
      numberOfTimes: newCardData.parameters.numberOfTimes,
      periodInDays: newCardData.parameters.periodInDays,
      rolling: newCardData.parameters.rolling,
      taperIn: newCardData.parameters.taperIn,
    };
  }

  static getDefaultParameters() {
    return {
      name: '',
      desc: '',
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
      dayOfMonth: undefined,
      dayOfYear: {day: undefined, month: undefined},
      numberOfTimes: undefined,
      periodInDays: undefined,
    };
  }
}
