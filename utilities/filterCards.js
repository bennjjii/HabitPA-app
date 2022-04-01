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

const numberOfCardsInAmountOfTime = () => {};

export default filterCards = (deck, history, date, timeOfDay) => {
  const returnedCards = deck.filter(card => {
    switch (card.freq.code) {
      case 'ED':
        if (card.parameters.timeOfDay === timeOfDay) {
          return true;
        } else {
          return false;
        }
      case 'XpD':
        //if we count x cards from history today or more, return false, else return true
        return false;
      case 'EW':
        //if it is one of the specified days, AND it is the specified time of day, true, else false
        return false;
      case 'XpW':
        //if we count x or more cards in the past 7 days, return false, else true
        return false;
      case 'EM':
        //if we are on the day of the month that is specified, return true, else return false
        return false;
      case 'XpM':
        //if we count x or more cards in the past 30 days return false, else return true
        return false;
      case 'XpY':
        //if we count x or more cards in the past Y days return false, else return true
        return false;
      case 'XiT':
        //if we count X or more cards return false, else return true,
        //we could have some kind of scatter function here
        return false;
      case 'SpT':
        //if we are at the specific date and time of day return true, else return false
        return false;
      case 'DL':
        //if we are before the deadline, return true, else return false and discard card
        return false;
      case 'EY':
        //if we are on date return true, else return false
        return false;
      case 'XpY':
        //if we count X times in the past year, return true, else return false
        return false;
    }
  });
  return returnedCards;
};
