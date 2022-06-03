import uuid from 'react-native-uuid';

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

  static getCardDefinitions() {
    return {
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
        explanation:
          'Schedule the practise of a habit roughly X times in Y days',
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
        explanation:
          'Schedule a habit or activity on a certain day of the year.',
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
        explanation:
          'Schedule the practise of a habit X times in a given year.',
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
