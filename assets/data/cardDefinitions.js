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
    parameters: {
      timeOfDay: [undefined],
    },
  },
  XpD: {
    code: 'XpD',
    name: 'X times a day',
    parameters: {
      numberOfTimes: undefined,
    },
  },
  EW: {
    code: 'EW',
    name: 'Every week on...',
    parameters: {
      weekDay: [undefined],
      timeOfDay: [],
    },
  },
  //X times in a set week, and x times in the last 7 days are different
  XpW: {
    code: 'XpW',
    name: 'X times in a week',
    parameters: {
      numberOfTimes: undefined,
      taperIn: undefined,
      rolling: true,
    },
  },
  EM: {
    code: 'EM',
    name: 'Every month on...',
    parameters: {
      dayOfMonth: [],
    },
  },
  XpM: {
    code: 'XpM',
    name: 'X times in a month',
    parameters: {
      numberOfTimes: undefined,
      taperIn: undefined,
      rolling: true,
    },
  },
  XpY: {
    code: 'XpY',
    name: 'X times every Y days',
    parameters: {
      numberOfTimes: undefined,
      days: undefined,
      taperIn: undefined,
      rolling: true,
    },
  },
  XiT: {
    code: 'XiT',
    name: 'X times in total',
    parameters: {
      numberOfTimes: undefined,
      numberOfDays: undefined,
    },
  },
  SpT: {
    code: 'SpT',
    name: 'At a specific time',
    parameters: {
      date: undefined,
      timeOfDay: undefined,
    },
  },
  DL: {
    code: 'DL',
    name: 'By a deadline',
    parameters: {
      date: undefined,
    },
  },
  EY: {code: 'EY', name: 'Every year on...', date: [undefined]},
  XpY: {
    code: 'XpY',
    name: 'X times a year',
    parameters: {
      numberOfTimes: undefined,
      rolling: true,
    },
  },
};
