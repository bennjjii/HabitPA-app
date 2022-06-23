import uuid from 'react-native-uuid';

export default class Card {
  constructor(newCard) {
    //uuid
    this.uuid = newCard ? uuid.v4() : undefined;
    //metadata
    this.created = newCard ? new Date() : undefined;
    //flags
    this.current = newCard?.current || true;
    this.backburner = newCard?.backburner || false;
    this.code = newCard?.code || undefined;
    this.name = newCard?.name || '';
    this.desc = newCard?.desc || ''; // remove
    //parameters
    this.parameters = {
      timeOfDay: {
        Morning: newCard?.parameters.timeOfDay?.Morning || false,
        Afternoon: newCard?.parameters.timeOfDay?.Afternoon || false,
        Evening: newCard?.parameters.timeOfDay?.Evening || false,
        Night: newCard?.parameters.timeOfDay?.Night || false,
      },
      dayOfWeek: {
        Monday: newCard?.parameters.dayOfWeek?.Monday || false,
        Tuesday: newCard?.parameters.dayOfWeek?.Tuesday || false,
        Wednesday: newCard?.parameters.dayOfWeek?.Wednesday || false,
        Thursday: newCard?.parameters.dayOfWeek?.Thursday || false,
        Friday: newCard?.parameters.dayOfWeek?.Friday || false,
        Saturday: newCard?.parameters.dayOfWeek?.Saturday || false,
        Sunday: newCard?.parameters.dayOfWeek?.Sunday || false,
      },
      dayOfMonth: newCard?.parameters.dayOfMonth || {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
        21: false,
        22: false,
        23: true,
        24: false,
        25: false,
        26: false,
        27: false,
        28: false,
        29: false,
        30: false,
        31: false,
      },
      dayOfYear: {
        day: newCard?.parameters.dayOfYear?.day || undefined,
        month: newCard?.parameters.dayOfYear?.month || undefined,
      },
      date: newCard?.parameters.date || undefined,
      numberOfTimes: newCard?.parameters.numberOfTimes || undefined,
      periodInDays: newCard?.parameters.periodInDays || undefined,
    };
  }

  static cardDefinitions = {
    ED: {
      enabled: true,
      code: 'ED',
      name: 'Every day',
      explanation: 'Practise a habit every day. You may choose the time of day',
      parameters: {
        timeOfDay: [undefined],
      },
    },
    XpD: {
      enabled: true,
      code: 'XpD',
      name: 'X times a day',
      explanation: 'Practise a habit a number of times, every day',
      parameters: {
        numberOfTimes: undefined,
      },
    },
    EW: {
      enabled: true,
      code: 'EW',
      name: 'Every week on...',
      explanation:
        'Practise a habit every week on specific days. You may choose a time of day.',
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
      explanation: 'Practise a habit X times in a calendar week.',
      parameters: {
        numberOfTimes: undefined,
      },
    },
    RxW: {
      enabled: true,
      code: 'RxW',
      name: 'Roughly x times in a week',
      explanation: 'Practise a habit roughly X times in 7 days.',
      parameters: {
        numberOfTimes: undefined,
      },
    },
    EM: {
      enabled: true,
      code: 'EM',
      name: 'Every month on...',
      explanation: 'Practise of a habit on specific days of the month.',
      parameters: {
        dayOfMonth: [],
      },
    },
    XpM: {
      enabled: true,
      code: 'XpM',
      name: 'X times in a month',
      explanation: 'Practise a habit X times in a calendar month.',
      parameters: {
        numberOfTimes: undefined,
      },
    },
    RxM: {
      enabled: true,
      code: 'RxM',
      name: 'Roughly x times in a month',
      explanation: 'Practise a habit roughly X times in 30 days.',
      parameters: {
        numberOfTimes: undefined,
      },
    },
    XiY: {
      enabled: true,
      code: 'XiY',
      name: 'X times in every Y days',
      explanation: 'Practise a habit roughly X times in Y days',
      parameters: {
        numberOfTimes: undefined,
        periodInDays: undefined,
      },
    },
    XiT: {
      enabled: true,
      code: 'XiT',
      name: 'X times in total',
      explanation:
        'Practise of a habit X times in total. You may specify a period.',
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
        'Schedule the practise of a habit or task for a certain date.',
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
      explanation: 'Schedule the completion of a habit or task by a deadline.',
      parameters: {
        date: undefined,
      },
    },
    EY: {
      enabled: true,
      code: 'EY',
      name: 'Every year on...',
      explanation: 'Schedule a habit on a certain day of the year.',
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
      explanation: 'Practise a habit X times in a calendar year.',
      parameters: {
        numberOfTimes: undefined,
      },
    },
    RxY: {
      enabled: true,
      code: 'RxY',
      name: 'Roughly X times a year',
      explanation: 'Practise a habit roughly X times in 365 days.',
      parameters: {
        numberOfTimes: undefined,
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
}
