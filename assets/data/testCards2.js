import Card from '../../components/CardClass';

module.exports = [
  new Card({
    backburner: true,
    code: 'EW',
    name: 'Boxing2',
    parameters: {
      dayOfWeek: {
        Monday: true,
        Thursday: true,
        Sunday: true,
      },
    },
  }),
  new Card({
    code: 'Xpw',
    name: 'Gym',
    parameters: {
      numberOfTimes: 4,
    },
  }),
  new Card({
    code: 'ED',
    name: 'Study Italian',
    parameters: {
      timeOfDay: {
        Evening: true,
      },
    },
  }),
  new Card({
    code: 'ED',
    name: 'Take creatine',
    parameters: {
      timeOfDay: {
        Morning: true,
      },
    },
  }),
  new Card({
    code: 'ED',
    name: 'Wake up early',
    parameters: {
      timeOfDay: {
        Morning: true,
      },
    },
  }),
  new Card({
    code: 'ED',
    name: 'Take vitamins',
    parameters: {
      timeOfDay: {
        Morning: true,
      },
    },
  }),
  new Card({
    code: 'ED',
    name: 'Meditate',
    parameters: {
      timeOfDay: {
        Morning: true,
        Night: true,
      },
    },
  }),
  new Card({
    code: 'EY',
    name: 'File taxes',
    parameters: {
      dayOfYear: {
        day: 1,
        month: 6,
      },
    },
  }),
  new Card({
    code: 'XpW',
    name: 'Tidy Room 10 mins',
    parameters: {
      numberOfTimes: 2,
    },
  }),
  new Card({
    code: 'RxM',
    name: 'Work on tunes for 30 mins',
    parameters: {
      numberOfTimes: 6,
    },
  }),
  new Card({
    code: 'XpM',
    name: 'Write one song',
    parameters: {
      numberOfTimes: 2,
    },
  }),
  new Card({
    code: 'ED',
    name: 'Write diary',
    parameters: {
      timeOfDay: {
        Night: true,
      },
    },
  }),
  new Card({
    code: 'ED',
    name: 'Plan tomorrow',
    parameters: {
      timeOfDay: {
        Night: true,
      },
    },
  }),
];
