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

export default selectCards = (deck, history, date, timeOfDay) => {
  const returnedCards = deck.filter(card => {
    switch (card.freq.code) {
      case 'ED':
        if (card.parameters.timeOfDay === timeOfDay) {
          return true;
        } else {
          return false;
        }
      case 'XpD':
        return false;
      case 'EW':
        return false;
      case 'XpW':
        return false;
      case 'EM':
        return false;
      case 'XpM':
        return false;
      case 'XpY':
        return false;
      case 'XiT':
        return false;
      case 'SpT':
        return false;
      case 'Dl':
        return false;
      case 'EY':
        return false;
      case 'XpY':
        return false;
    }
  });
  return returnedCards;
};
