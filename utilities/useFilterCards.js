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

const defaultReturn = false;

const numberOfCardsInAmountOfTime = () => {};

const getTimeOfDay = (m, a, e, n) => {
  const currentHour = new Date().getHours();
  //const currentHour = 22;
  console.log(currentHour);
  switch (true) {
    case currentHour < m[1] && currentHour >= m[0]:
      return TimeOfDay.Morning;

    case currentHour < a[1] && currentHour >= a[0]:
      return TimeOfDay.Afternoon;

    case currentHour < e[1] && currentHour >= e[0]:
      return TimeOfDay.Evening;

    case currentHour < n[1] && currentHour >= n[0]:
      return TimeOfDay.Night;
    default:
      return undefined;
  }
};

export default useFilterCards = (deck, history, m, a, e, n) => {
  //console.log(deck);
  const timeOfDay = getTimeOfDay(m, a, e, n);
  console.log(timeOfDay);
  const returnedCards = deck.filter(card => {
    switch (card.code) {
      case 'ED':
        return Object.keys(card.parameters.timeOfDay).some(time => {
          return timeOfDay === time && card.parameters.timeOfDay[time];
        });

      case 'XpD':
        //if we count x cards from history today or more, return false, else return true
        return defaultReturn;
      case 'EW':
        //if it is one of the specified days, AND it is the specified time of day, true, else false
        return defaultReturn;
      case 'XpW':
        //if we count x or more cards in the past 7 days, return false, else true
        return defaultReturn;
      case 'RxW':
        return defaultReturn;
      case 'EM':
        //if we are on the day of the month that is specified, return true, else return false
        return defaultReturn;
      case 'XpM':
        //if we count x or more cards in the past 30 days return false, else return true
        return defaultReturn;
      case 'RxM':
        return defaultReturn;
      case 'XiY':
        //if we count x or more cards in the past Y days return false, else return true
        return defaultReturn;
      case 'XiT':
        //if we count X or more cards return false, else return true,
        //we could have some kind of scatter function here
        return defaultReturn;
      case 'SpT':
        //if we are at the specific date and time of day return true, else return false
        return defaultReturn;
      case 'DL':
        //if we are before the deadline, return true, else return false and discard card
        return defaultReturn;
      case 'EY':
        //if we are on date return true, else return false
        return defaultReturn;
      case 'XpY':
        //if we count X times in the past year, return true, else return false
        return defaultReturn;
      case 'RxY':
        return defaultReturn;
      case 'AsP':
        return defaultReturn;
    }
  });
  return returnedCards;
};
