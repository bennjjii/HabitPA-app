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

module.exports = [
  {
    name: 'Boxing',
    id: 1,
    freq: {
      code: 'EW',
      name: 'Every week on...',
      parameters: {
        weekDay: [Day.Monday, Day.Wednesday, Day.Sunday],
      },
    },
  },
  {
    name: 'Gym',
    id: 2,
    freq: {
      code: 'XpW',
      name: 'X times in a week',
      parameters: {
        numberOfTimes: 3,
        taperIn: false,
      },
    },
  },
  {
    name: 'Study Italian',
    id: 3,
  },
  {
    name: 'Take creatine',
    id: 4,
    freq: {
      code: 'ED',
      name: 'Every day',
      parameters: {
        timeOfDay: [TimeOfDay.Morning],
      },
    },
  },
  {
    name: 'Wake up early',
    id: 5,
    freq: {
      code: 'ED',
      name: 'Every day',
      parameters: {
        timeOfDay: [TimeOfDay.Morning],
      },
    },
  },
  {
    name: 'Take vitamins',
    id: 6,
    freq: {
      code: 'ED',
      name: 'Every day',
      parameters: {
        timeOfDay: [TimeOfDay.Morning],
      },
    },
  },
  {
    name: 'Meditate',
    id: 7,
    freq: {},
  },
  {
    name: 'File taxes',
    id: 8,
    freq: {
      code: 'EY',
      name: 'Every year on...',
      parameters: {
        date: ['01 / 06'],
      },
    },
  },
  {
    name: 'Tidy Room 10 mins',
    id: 9,
    freq: {},
  },
  {
    name: 'Work on tunes for 30 mins',
    id: 10,

    freq: {},
  },
  {
    name: 'Write one song',
    id: 11,
    freq: {},
  },
  {
    name: 'Write diary',
    id: 12,
    freq: {},
  },
  {
    name: 'Plan tomorrow',
    id: 13,
    freq: {},
  },
];
