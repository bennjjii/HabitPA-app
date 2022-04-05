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

const commonParameters = {
  timeOfDay: [],
  dayOfWeek: [],
  dayOfMonth: [],
  dayOfYear: [],
  date: undefined,
  numberOfTimes: undefined,
  periodInDays: undefined,
  rolling: undefined,
  taperIn: undefined,
};

export default {
  ED: {
    enabled: true,
    code: 'ED',
    name: 'Every day',
    explanation:
      'Schedule the practise of a habit every day. Choose the time of day. If u like.',
    parameters: {
      timeOfDay: [undefined],
    },
  },
  XpD: {
    enabled: true,
    code: 'XpD',
    name: 'X times a day',
    explanation:
      'Schedule the practise of a habit a number of times, every day',
    parameters: {
      numberOfTimes: undefined,
    },
  },
  EW: {
    enabled: true,
    code: 'EW',
    name: 'Every week on...',
    explanation:
      'Schedule the practise of a habit every week on specific days. Choose the time of day if you like.',
    parameters: {
      dayOfWeek: [undefined],
      timeOfDay: [],
    },
  },
  //X times in a set week, and x times in the last 7 days are different
  XpW: {
    enabled: true,
    code: 'XpW',
    name: 'X times in a week',
    explanation:
      'Schedule the practise of a habit X times in a week. Choose between a calendar week or rolling week. This card can be tapered in.',
    parameters: {
      numberOfTimes: undefined,
      taperIn: undefined,
      rolling: true,
    },
  },
  RxW: {
    enabled: true,
    code: 'RxW',
    name: 'Roughly x times in a week',
    explanation:
      'Schedule the practise of a habit roughly X times in 7 days. This card can be tapered in.',
    parameters: {
      numberOfTimes: undefined,
      taperIn: undefined,
    },
  },
  EM: {
    enabled: true,
    code: 'EM',
    name: 'Every month on...',
    explanation:
      'Schedule the practise of a habit on specific days of the month.',
    parameters: {
      dayOfMonth: [],
    },
  },
  XpM: {
    enabled: true,
    code: 'XpM',
    name: 'X times in a month',
    explanation:
      'Schedule the practise of a habit X times in a month. Choose between a calendar month or rolling month. This card can be tapered in.',
    parameters: {
      numberOfTimes: undefined,
      taperIn: undefined,
      rolling: true,
    },
  },
  XpY: {
    enabled: true,
    code: 'XpY',
    name: 'X times every Y days',
    parameters: {
      numberOfTimes: undefined,
      periodInDays: undefined,
      taperIn: undefined,
      rolling: true,
    },
  },
  XiT: {
    enabled: true,
    code: 'XiT',
    name: 'X times in total',
    parameters: {
      numberOfTimes: undefined,
      periodInDays: undefined,
    },
  },
  SpT: {
    enabled: true,
    code: 'SpT',
    name: 'At a specific time',
    parameters: {
      date: undefined,
      timeOfDay: undefined,
    },
  },
  DL: {
    enabled: true,
    code: 'DL',
    name: 'By a deadline',
    parameters: {
      date: undefined,
    },
  },
  EY: {
    enabled: true,
    code: 'EY',
    name: 'Every year on...',
    parameters: {
      dayOfYear: [undefined],
    },
  },
  XpY: {
    enabled: true,
    code: 'XpY',
    name: 'X times a year',
    parameters: {
      numberOfTimes: undefined,
      rolling: true,
    },
  },
  AsP: {
    enabled: true,
    code: 'AsP',
    name: 'At some point',
    parameters: {},
  },
};
