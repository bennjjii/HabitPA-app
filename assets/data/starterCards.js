import Card from '../../components/CardClass';

module.exports = [
  new Card({
    code: 'AsP',
    name: 'Welcome to HabitMage! Swipe this card right to learn more!',
    parameters: {},
  }),
  new Card({
    code: 'AsP',
    name: 'HabitMage helps you learn, keep and track habits!\n (Swipe right again!)',
    parameters: {},
  }),
  new Card({
    code: 'AsP',
    name: 'This screen is your deck. You can flick through the deck to find which habits you should be doing now',
    parameters: {},
  }),
  new Card({
    code: 'AsP',
    name: 'Visit the centre tab to add new habits to the deck! Different coloured cards come up at different times!\n\n\n-  v  -',
    parameters: {},
  }),
  new Card({
    code: 'AsP',
    name: 'Visit the rightmost tab to view your progress and stats, and to edit and delete cards\n\n\n-  -  v',
    parameters: {},
  }),
  new Card({
    code: 'AsP',
    name: "That's about it! Have fun!",
    parameters: {},
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
