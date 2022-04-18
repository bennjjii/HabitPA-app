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

const getTimeOfDay = (m, a, e, n) => {
  //const currentHour = new Date().getHours();
  const currentHour = 3;
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

const filterHistoryByDate = (history, cutoffDate) => {
  return history.filter(
    instance => instance.timestamp.getTime() > cutoffDate.getTime(),
  );
};

const countCardsAfterDate = (history, card, cutoffDate) => {
  return (
    card.parameters.numberOfTimes >
    history
      .filter(instance => instance.timestamp.getTime() > cutoffDate.getTime())
      .filter(instance => card.uuid === instance.uuid).length
  );
};

export default (deck, history, m, a, e, n) => {
  const timeOfDay = getTimeOfDay(m, a, e, n);
  const today = new Date(new Date()).toLocaleString('en-us', {weekday: 'long'});
  return deck.filter(card => {
    switch (card.code) {
      case 'ED':
        return card.parameters.timeOfDay[timeOfDay];
      case 'XpD':
        //if we count x cards from history today or more, return false, else return true
        return countCardsAfterDate(
          history,
          card,
          new Date(new Date().setHours(0, 0, 0, 0)),
        );
      case 'EW':
        //if it is one of the specified days, AND it is the specified time of day, true, else false
        //check if today is true and...
        return (
          card.parameters.dayOfWeek[today] &&
          //if any one of the time of day parameters has been set, do the check
          //for if we are in the time of day and return that coparameter
          //and if we haven't set any days (as it is optional), we just return true
          (Object.keys(card.parameters.timeOfDay).some(time => {
            return card.parameters.timeOfDay[time];
          })
            ? card.parameters.timeOfDay[timeOfDay]
            : true)
        );
      case 'XpW':
        //if we count x or more cards in the past 7 days, return false, else true
        return countCardsAfterDate(
          history,
          card,
          new Date(new Date() - 86400000 * 7),
        );
      case 'RxW':
        //need to figure out how this differs from XpW and if it is worth having two different cards
        return defaultReturn;
      case 'EM':
        //if we are on the day of the month that is specified, return true, else return false
        //because we have not implemented multiple dates yet, both
        //functionalities are implemented
        if (Array.isArray(card.parameters.dayOfMonth)) {
          return card.parameters.dayOfMonth.some(date => {
            return date === new Date().getDate();
          });
        } else {
          return card.parameters.dayOfMonth === new Date().getDate();
        }
      case 'XpM':
        //if we count x or more cards in the past 30 days return false, else return true
        return countCardsAfterDate(
          history,
          card,
          new Date(new Date() - 86400000 * 30),
        );
      case 'RxM':
        //need to figure out how this differs from XpW and if it is worth having two different cards
        return defaultReturn;
      case 'XiY':
        //if we count x or more cards in the past Y days return false, else return true
        return countCardsAfterDate(
          history,
          card,
          new Date(new Date() - 86400000 * card.parameters.periodInDays),
        );
      case 'XiT':
        //if we count X or more cards return false, else return true,
        //we could have some kind of scatter function here
        if (card.parameters.periodInDays) {
          return (
            new Date(
              new Date() + 86400000 * card.parameters.periodInDays,
            ).getTime() > new Date().getTime() &&
            card.parameters.numberOfTimes >
              history.filter(instance => {
                return instance.uuid === card.uuid;
              }).length
          );
        } else {
          return (
            card.parameters.numberOfTimes >
            history.filter(instance => {
              return instance.uuid === card.uuid;
            }).length
          );
        }
      case 'SpT':
        return Object.keys(card.parameters.timeOfDay).some(time => {
          return card.parameters.timeOfDay[time];
        })
          ? card.parameters.timeOfDay[timeOfDay] &&
              new Date().toLocaleDateString('en-GB') ===
                card.parameters.date.toLocaleDateString('en-GB')
          : new Date().toLocaleDateString('en-GB') ===
              card.parameters.date.toLocaleDateString('en-GB');
        //if we are at the specific date and time of day return true, else return false
        return defaultReturn;
      case 'DL':
        return new Date().getTime() < card.parameters.date.getTime();
      //if we are before the deadline, return true, else return false and discard card

      case 'EY':
        //if we are on date return true, else return false
        return (
          new Date().getDate() === card.parameters.dayOfYear.day &&
          new Date().getMonth + 1 === card.parameters.dayOfYear.month
        );
      case 'XpY':
        //if we count X times in the past year, return true, else return false
        return countCardsAfterDate(
          history,
          card,
          new Date(new Date() - 86400000 * 365),
        );
      case 'RxY':
        return defaultReturn;
      case 'AsP':
        return true;
    }
  });
};
