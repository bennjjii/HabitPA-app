import countCardsAfterDate from './countCardsAfterDate';
import {CardClass} from '../components/CardClass';
import {TimesOfDay} from '../services/zustandContext';
import {HistoryItem} from '../services/zustandContext';

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
  Bedtime: 'Bedtime',
};

const getLastMonday = () => {
  let lastMonday = new Date();
  lastMonday.setDate(lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7));
  lastMonday.setHours(0, 0, 0, 0);
  return lastMonday;
};

const getFirstDayOfMonth = () => {
  let firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  firstDayOfMonth.setHours(0, 0, 0, 0);
  return firstDayOfMonth;
};

const getFirstDayOfYear = () => {
  let firstDayOfYear = new Date();
  firstDayOfYear.setMonth(0);
  firstDayOfYear.setDate(1);
  firstDayOfYear.setHours(0, 0, 0, 0);
  return firstDayOfYear;
};

const getTimeOfDay = timesOfDay => {
  const currentHour = new Date().getHours();
  //const currentHour = 3;
  switch (true) {
    case currentHour < timesOfDay.Morning[1] &&
      currentHour >= timesOfDay.Morning[0]:
      return TimeOfDay.Morning;
    case currentHour < timesOfDay.Afternoon[1] &&
      currentHour >= timesOfDay.Afternoon[0]:
      return TimeOfDay.Afternoon;
    case currentHour < timesOfDay.Evening[1] &&
      currentHour >= timesOfDay.Evening[0]:
      return TimeOfDay.Evening;
    case currentHour < timesOfDay.Bedtime[1] &&
      currentHour >= timesOfDay.Bedtime[0]:
      return TimeOfDay.Bedtime;
    default:
      return undefined;
  }
};

// const filterHistoryByDate = (history, cutoffDate) => {
//   return history.filter(
//     instance => instance.timestamp.getTime() > cutoffDate.getTime(),
//   );
// };

export default (
  deck: Array<CardClass>,
  history: Array<HistoryItem>,
  timesOfDay: TimesOfDay,
): Array<CardClass> => {
  const currentTimeOfDay = getTimeOfDay(timesOfDay);
  const today = new Date(new Date()).toLocaleString('en-us', {weekday: 'long'});
  return deck.filter(card => {
    if (card.backburner || !card.current) {
      return false;
    }
    let isReturned = false;
    switch (card.code) {
      case 'ED':
        //except if u have already done this morning...
        const timesOfDayBeingUsed = Object.keys(card.parameters.timeOfDay).some(
          timeOfDay => {
            return card.parameters.timeOfDay[timeOfDay];
          },
        );
        if (timesOfDayBeingUsed) {
          isReturned =
            card.parameters.timeOfDay[currentTimeOfDay] &&
            history
              .filter(
                instance =>
                  instance.timestamp.getTime() >
                  new Date(
                    new Date().setHours(
                      timesOfDay[currentTimeOfDay][0],
                      0,
                      0,
                      0,
                    ),
                  ).getTime(),
              )
              .filter(instance => card.uuid === instance.uuid).length === 0;
        } else {
          isReturned =
            history
              .filter(
                instance =>
                  instance.timestamp.getTime() >
                  new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
              )
              .filter(instance => card.uuid === instance.uuid).length === 0;
        }
        break;
      case 'XpD':
        //if we count x cards from history today or more, return false, else return true
        isReturned =
          card.parameters.numberOfTimes >
          countCardsAfterDate(
            card,
            history,
            new Date(new Date().setHours(0, 0, 0, 0)),
          );
        break;
      case 'EW':
        //if it is one of the specified days, AND it is the specified time of day, true, else false
        //check if today is true and...
        isReturned =
          card.parameters.dayOfWeek[today] &&
          //if any one of the time of day parameters has been set, do the check
          //for if we are in the time of day and return that coparameter
          //and if we haven't set any days (as it is optional), we just return true
          (Object.keys(card.parameters.timeOfDay).some(time => {
            return card.parameters.timeOfDay[time];
          })
            ? card.parameters.timeOfDay[currentTimeOfDay]
            : true);
        break;
      case 'XpW':
        //if we count x or more cards since Monday 00hrs return false
        isReturned =
          card.parameters.numberOfTimes >
          countCardsAfterDate(card, history, getLastMonday());
        break;
      case 'RxW':
        //if we count X cards or more in last y days return false
        isReturned =
          card.parameters.numberOfTimes >
          countCardsAfterDate(
            card,
            history,
            new Date(new Date().getTime() - 86400000 * 7),
          );
        break;
      case 'EM':
        //if we are on the day of the month that is specified, return true, el`se return false
        //because we have not implemented multiple dates yet, both
        //functionalities are implemented

        // isReturned = card.parameters.dayOfMonth.some((date, index) => {
        //   return date && index === new Date().getDate() - 1;
        // });

        isReturned = Object.keys(card.parameters.dayOfMonth).some(
          (key, index) => {
            return (
              card.parameters.dayOfMonth[key] &&
              parseInt(key) == new Date().getDate()
            );
          },
        );

        break;
      case 'XpM':
        //if we count x or more cards since the start of the month return false, else return true
        isReturned =
          card.parameters.numberOfTimes >
          countCardsAfterDate(card, history, getFirstDayOfMonth());
        break;
      case 'RxM':
        //if we count x or more cards in the past 30 days return false, else return true
        isReturned =
          card.parameters.numberOfTimes >
          countCardsAfterDate(
            card,
            history,
            new Date(new Date().getTime() - 86400000 * 30),
          );
        break;
      case 'XiY':
        //if we count x or more cards in the past Y days return false, else return true
        isReturned =
          card.parameters.numberOfTimes >
          countCardsAfterDate(
            card,
            history,
            new Date(
              new Date().getTime() - 86400000 * card.parameters.periodInDays,
            ),
          );
        break;
      case 'XiT':
        //if we count X or more cards return false, else return true,
        //we could have some kind of scatter function here
        if (card.parameters.periodInDays) {
          isReturned =
            new Date(
              card.created.getTime() + 86400000 * card.parameters.periodInDays,
            ).getTime() > new Date().getTime() &&
            card.parameters.numberOfTimes >
              history.filter(instance => {
                return instance.uuid === card.uuid;
              }).length;
        } else {
          isReturned =
            card.parameters.numberOfTimes >
            history.filter(instance => {
              return instance.uuid === card.uuid;
            }).length;
        }
        break;
      case 'SpT':
        //temp fix

        //if (card.parameters.date) {
        // isReturned = Object.keys(card.parameters.timeOfDay).some(time => {
        //   return card.parameters.timeOfDay[time];
        // })
        //   ? card.parameters.timeOfDay[currentTimeOfDay] &&
        //     new Date().toLocaleDateString('en-GB') ===
        //       card.parameters.date.toLocaleDateString('en-GB')
        //   : new Date().toLocaleDateString('en-GB') ===
        //     card.parameters.date.toLocaleDateString('en-GB');
        isReturned =
          new Date().toLocaleDateString('en-GB') ===
          card.parameters.date.toLocaleDateString('en-GB');

        //if we are at the specific date and time of day return true, else return false
        //return defaultReturn;
        break;
      case 'DL':
        //temp fix
        //if (card.parameters.date) {
        isReturned = new Date().getTime() < card.parameters.date.getTime();
        //}
        //if we are before the deadline, return true, else return false and discard card
        break;
      case 'EY':
        //if we are on date return true, else return false
        isReturned =
          new Date().getDate() === card.parameters.dayOfYear.day &&
          new Date().getMonth() + 1 === card.parameters.dayOfYear.month;
        break;
      case 'XpY':
        //if we count X times in the past year, return true, else return false
        isReturned =
          card.parameters.numberOfTimes >
          countCardsAfterDate(card, history, getFirstDayOfYear());
        break;
      case 'RxY':
        isReturned =
          card.parameters.numberOfTimes >
          countCardsAfterDate(
            card,
            history,
            new Date(new Date().getTime() - 86400000 * 365),
          );
        break;
      case 'AsP':
        if (countCardsAfterDate(card, history, new Date(0))) {
          isReturned = false;
        } else {
          isReturned = true;
        }
        break;
    }
    return isReturned;
  });
};
