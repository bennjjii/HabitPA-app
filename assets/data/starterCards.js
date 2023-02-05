import Card from '../../components/CardClass';

module.exports = [
  new Card({
    code: 'AsP',
    name: 'Welcome to HabitMage! Swipe this card left to complete a habit!',
    parameters: {},
  }),
  new Card({
    code: 'AsP',
    name: 'Swipe this card right to skip it for now!',
    parameters: {},
  }),
  new Card({
    code: 'AsP',
    name: 'Press on a card to flip it over!',
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
