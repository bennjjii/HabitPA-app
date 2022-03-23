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
    freq: {
      EW: {
        name: 'Every week on...',
        weekDay: [Day.Monday, Day.Wednesday, Day.Sunday],
      },
    },
  },
  {
    name: 'Gym',
    freq: {
      XpW: {
        name: 'X times in a week',
        numberOfTimes: 3,
      },
    },
  },
  {
    name: 'Study Italian',
  },
  {
    name: 'Take creatine',
    freq: {
      ED: {
        name: 'Every day',
        timeOfDay: [TimeOfDay.Morning],
      },
    },
  },
  {
    name: 'Wake up early',
    freq: {
      ED: {
        name: 'Every day',
        timeOfDay: [TimeOfDay.Morning],
      },
    },
  },
  {
    name: 'Take vitamins',
    freq: {
      ED: {
        name: 'Every day',
        timeOfDay: [TimeOfDay.Morning],
      },
    },
  },
  {
    name: 'Meditate',
  },
  {
    name: 'File taxes',
    freq: {
      EY: {
        name: 'Every year on...',
        date: ['01 / 06'],
      },
    },
  },
  {
    name: 'Tidy Room 10 mins',
  },
  {
    name: 'Work on tunes for 30 mins',
  },
  {
    name: 'Write one song',
  },
  {
    name: 'Write diary',
  },
  {
    name: 'Plan tomorrow',
  },
];
