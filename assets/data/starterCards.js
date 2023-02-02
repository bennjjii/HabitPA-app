import Card from '../../components/CardClass';

module.exports = [
  new Card({
    code: 'AsP',
    name: 'Add some habits!',
    parameters: {
      numberOfTimes: 4,
    },
  }),
  new Card({
    code: 'ED',
    name: 'Study a language',
    parameters: {
      timeOfDay: {
        Evening: true,
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
    name: 'Meditate',
    parameters: {
      timeOfDay: {
        Morning: true,
        Bedtime: true,
      },
    },
  }),
  new Card({
    code: 'XpW',
    name: 'Tidy Room',
    parameters: {
      numberOfTimes: 2,
    },
  }),
  new Card({
    code: 'ED',
    name: 'Write journal',
    parameters: {
      timeOfDay: {
        Bedtime: true,
      },
    },
  }),
  new Card({
    code: 'ED',
    name: 'Plan tomorrow',
    parameters: {
      timeOfDay: {
        Bedtime: true,
      },
    },
  }),
];
