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
  dayOfYear: {
    day: undefined,
    month: undefined,
  },
  day: undefined,
  month: undefined,
  date: new Date(0),
  numberOfTimes: undefined,
  periodInDays: undefined,
  rolling: false,
  taperIn: false,
};

//should one card be for calendar weeks etc and one for rolling quantities
//after all what we really want it for the habit to be maintained for us
//We should reduce the number of cards probably
//should night be bedtime??

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
      //default this to all selected vv
      timeOfDay: [],
    },
  },
  //X times in a set week, and x times in the last 7 days are different
  XpW: {
    //default calendar week. randomise if less than 7
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
      'Schedule the practise of a habit to work out to roughly X times in 7 days. This card can be tapered in.',
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
  RxM: {
    enabled: true,
    code: 'RxM',
    name: 'Roughly x times in a month',
    explanation:
      'Schedule the practise of a habit to work out to roughly X times per 30 days. This card can be tapered in.',
    parameters: {
      numberOfTimes: undefined,
      taperIn: undefined,
    },
  },
  XiY: {
    enabled: true,
    code: 'XiY',
    name: 'X times in every Y days',
    explanation: 'Schedule the practise of a habit roughly X times in Y days',
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
    explanation:
      'Schedule the practise of a habit X times in total. Optionally specify a period.',
    parameters: {
      numberOfTimes: undefined,
      //to use this need to record a creation time
      periodInDays: undefined,
    },
  },
  SpT: {
    enabled: true,
    code: 'SpT',
    name: 'At a specific time',
    explanation:
      'Schedule the practise of a habit or activity for a certain date.',
    parameters: {
      date: undefined,
      //seems like would be easy to miss to have at a specific time here
      timeOfDay: undefined,
    },
  },
  DL: {
    enabled: true,
    code: 'DL',
    name: 'By a deadline',
    explanation: 'Schedule the completion of a habit by a deadline.',
    parameters: {
      date: undefined,
    },
  },
  EY: {
    enabled: true,
    code: 'EY',
    name: 'Every year on...',
    explanation: 'Schedule a habit or activity on a certain day of the year.',
    parameters: {
      dayOfYear: {
        day: undefined,
        month: undefined,
      },
    },
  },
  XpY: {
    enabled: true,
    code: 'XpY',
    name: 'X times a year',
    explanation: 'Schedule the practise of a habit X times in a given year.',
    parameters: {
      numberOfTimes: undefined,
      rolling: true,
    },
  },
  RxY: {
    enabled: true,
    code: 'RxY',
    name: 'Roughly X times a year',
    explanation:
      'Schedule the practise of a habit to work out roughly X times in any year.',
    parameters: {
      numberOfTimes: undefined,
      rolling: true,
    },
  },
  AsP: {
    enabled: true,
    code: 'AsP',
    name: 'At some point',
    explanation: 'Something to be completed at some point.',
    parameters: {},
  },
};
