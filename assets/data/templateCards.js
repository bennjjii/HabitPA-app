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

export default {
  ED: {
    code: 'ED',
    name: 'Every day',
    timeOfDay: [undefined],
  },
  XpD: {
    code: 'XpD',
    name: 'X times a day',
    numberOfTimes: undefined,
  },
  EW: {
    code: 'EW',
    name: 'Every week on...',
    weekDay: [undefined],
  },
  XpW: {
    code: 'XpW',
    name: 'X times in a week',
    numberOfTimes: undefined,
    taperIn: undefined,
  },
  EM: {
    code: 'EM',
    name: 'Every month on...',
    dayOfMonth: [],
  },
  XpM: {
    code: 'XpM',
    name: 'X times in a month',
    numberOfTimes: undefined,
    taperIn: undefined,
  },
  XpY: {
    code: 'XpY',
    name: 'X times every Y days',
    numberOfTimes: undefined,
    days: undefined,
    taperIn: undefined,
  },
  XiT: {
    code: 'XiT',
    name: 'X times in total',
    numberOfTimes: undefined,
    numberOfDays: undefined,
  },
  SpT: {
    code: 'SpT',
    name: 'At a specific time',
    date: undefined,
    timeOfDay: undefined,
  },
  DL: {
    code: 'DL',
    name: 'By a deadline',
    date: undefined,
  },
  EY: {code: 'EY', name: 'Every year on...', date: [undefined]},
  XpY: {
    code: 'XpY',
    name: 'X times a year',
    numberOfTimes: undefined,
  },
};
