import uuid from 'react-native-uuid';
import countCardsAfterDate from '../utilities/countCardsAfterDate';
import getAgeOfCardInDays from '../utilities/getAgeOfCardInDays';
import CustomCheckbox from './CustomCheckBox';
import ProgressBarGraph from './ProgressBarGraph';
import React from 'react';

const YEAR_IN_MILLISECONDS = 31557600000;

const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export default class Card {
  constructor(newCard) {
    //uuid
    this.uuid = newCard ? uuid.v4() : undefined;
    //metadata
    this.created = newCard ? new Date() : undefined;
    //flags
    this.current = newCard?.current || true;
    this.backburner = newCard?.backburner || false;
    this.code = newCard?.code || undefined;
    this.name = newCard?.name || '';
    // this.desc = newCard?.desc || ''; // remove
    //parameters
    this.parameters = {
      timeOfDay: {
        Morning: newCard?.parameters.timeOfDay?.Morning || false,
        Afternoon: newCard?.parameters.timeOfDay?.Afternoon || false,
        Evening: newCard?.parameters.timeOfDay?.Evening || false,
        Night: newCard?.parameters.timeOfDay?.Night || false,
      },
      dayOfWeek: {
        Monday: newCard?.parameters.dayOfWeek?.Monday || false,
        Tuesday: newCard?.parameters.dayOfWeek?.Tuesday || false,
        Wednesday: newCard?.parameters.dayOfWeek?.Wednesday || false,
        Thursday: newCard?.parameters.dayOfWeek?.Thursday || false,
        Friday: newCard?.parameters.dayOfWeek?.Friday || false,
        Saturday: newCard?.parameters.dayOfWeek?.Saturday || false,
        Sunday: newCard?.parameters.dayOfWeek?.Sunday || false,
      },
      dayOfMonth: newCard?.parameters.dayOfMonth || {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
        21: false,
        22: false,
        23: false,
        24: false,
        25: false,
        26: false,
        27: false,
        28: false,
        29: false,
        30: false,
        31: false,
      },
      dayOfYear: {
        //nominal day i.e. 1 = 1
        day: newCard?.parameters.dayOfYear?.day || undefined,
        //nominal month i.e. 1 = Jan
        month: newCard?.parameters.dayOfYear?.month || undefined,
      },
      date: newCard?.parameters.date || undefined,
      numberOfTimes: newCard?.parameters.numberOfTimes || undefined,
      periodInDays: newCard?.parameters.periodInDays || undefined,
    };
  }

  static cardDefinitions = {
    ED: {
      enabled: true,
      code: 'ED',
      name: 'Every day',
      explanation: 'Practise a habit every day. You may choose the time of day',
      parameters: {
        timeOfDay: [undefined],
      },
      progressCoeffFunction: (card, history, parameters) => {
        //soft start
        //what percentage of last 7 days has habit been observed
        const ageOfCardInDays = getAgeOfCardInDays(card.created, 7);
        return Math.min(
          countCardsAfterDate(
            history,
            card,
            new Date(
              new Date(
                new Date().setDate(new Date().getDate() - ageOfCardInDays),
              ).setHours(0, 0, 0, 0),
            ),
          ) / ageOfCardInDays,
          1,
        );
      },
      progressRenderFunction: (props, history) => {
        const ageOfCardInDays = getAgeOfCardInDays(props.card.created, 4);
        let tempArray = [];
        for (let i = ageOfCardInDays; i >= 0; i--) {
          const middleOfDay = new Date(
            new Date(new Date().setDate(new Date().getDate() - i)).setHours(
              12,
              0,
              0,
              0,
            ),
          );
          const startOfDay = new Date(
            new Date().setDate(new Date().getDate() - i),
          );
          const endOfDay = new Date(
            new Date(
              new Date(startOfDay).setDate(new Date(startOfDay).getDate() + 1),
            ).setHours(0, 0, 0, 0),
          );
          startOfDay.setHours(0, 0, 0, 0);
          const cardCompletedToday =
            countCardsAfterDate(history, props.card, startOfDay, endOfDay) > 0;
          tempArray.push({
            day: middleOfDay.toString()[0],
            completed: cardCompletedToday,
          });
        }
        const componentToRender = tempArray.map(item => (
          <CustomCheckbox label={item.day} completed={item.completed} />
        ));

        return componentToRender;
      },
    },
    XpD: {
      enabled: true,
      code: 'XpD',
      name: 'X times a day',
      explanation: 'Practise a habit a number of times, every day',
      parameters: {
        numberOfTimes: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
        //soft start
        const ageOfCardInDays = getAgeOfCardInDays(card.created, 7);
        return Math.min(
          countCardsAfterDate(
            history,
            card,
            new Date(
              new Date(
                new Date().setDate(new Date().getDate() - ageOfCardInDays),
              ).setHours(0, 0, 0, 0),
            ),
          ) /
            (parameters.numberOfTimes * ageOfCardInDays),
          1,
        );
      },
      progressRenderFunction: (props, history) => {
        const ageOfCardInDays = getAgeOfCardInDays(props.card.created, 7);
        tempArray = [];
        for (let i = ageOfCardInDays; i >= 0; i--) {
          const startOfDay = new Date(
            new Date(new Date().setDate(new Date().getDate() - i)).setHours(
              0,
              0,
              0,
              0,
            ),
          );
          const middleOfDay = new Date(
            new Date(new Date().setDate(new Date().getDate() - i)).setHours(
              12,
              0,
              0,
              0,
            ),
          );
          const endOfDay = new Date(
            new Date(new Date().setDate(new Date().getDate() - i + 1)).setHours(
              0,
              0,
              0,
              0,
            ),
          );
          const numCompletedThisDay = countCardsAfterDate(
            history,
            props.card,
            startOfDay,
            endOfDay,
          );
          tempArray.push({
            label: middleOfDay.toString()[0],
            height: props.card.parameters.numberOfTimes,
            completed: numCompletedThisDay,
          });
        }
        const componentToRender = <ProgressBarGraph values={tempArray} />;
        return componentToRender;
      },
    },
    EW: {
      enabled: true,
      code: 'EW',
      name: 'Every week on...',
      explanation:
        'Practise a habit every week on specific days. You may choose a time of day.',
      parameters: {
        dayOfWeek: [undefined],
        //default this to all selected vv
        timeOfDay: [],
      },
      progressCoeffFunction: (card, history, parameters) => {
        //soft start
        //for every time you contracted you would in the past month, how many did you do?
        let filteredHistory = history.filter(instance => {
          return (instance.uuid = card.uuid);
        });
        const ageOfCardInDays = getAgeOfCardInDays(card.created, 30);
        //go through each day of past 30 and count each we said we would
        let accContracted = 0;
        let accActual = 0;
        for (let i = 0; i < ageOfCardInDays; i++) {
          let date = new Date(new Date().setDate(new Date().getDate() - 1 - i));
          let dayUncorrected = date.getDay();
          let dayCorrected;
          if (dayUncorrected === 0) {
            dayCorrected = 6;
          } else {
            dayCorrected = dayUncorrected - 1;
          }
          let dayKeys = Object.keys(parameters.dayOfWeek);
          if (
            filteredHistory.some(instance => {
              return (
                isSameDay(instance.timestamp === date) &&
                parameters.dayOfWeek[dayKeys[dayCorrected]]
              );
            })
          ) {
            accActual++;
          }
          if (parameters.dayOfWeek[dayKeys[dayCorrected]]) {
            accContracted++;
          }
        }
        return Math.min(accActual / accContracted, 1);
      },
      progressRenderFunction: (props, history) => {
        console.log('progressrenderfucntio');
        tempArray = [];
        const ageOfCardInDays = getAgeOfCardInDays(props.card.created, 30);
        for (let i = ageOfCardInDays; i >= 0; i--) {
          const middleOfDay = new Date(
            new Date(new Date().setDate(new Date().getDate() - i)).setHours(
              12,
              0,
              0,
              0,
            ),
          );
          const dayUncorrected = middleOfDay.getDay();
          const dayCorrected = dayUncorrected === 0 ? 6 : dayUncorrected - 1;
          const daysOfWeekArray = Object.keys(props.card.parameters.dayOfWeek);
          const isDayCounted =
            props.card.parameters.dayOfWeek[daysOfWeekArray[dayCorrected]];
          if (
            //it is one of the specified days
            isDayCounted
          ) {
            const startOfDay = new Date(
              new Date(new Date().setDate(new Date().getDate() - i)).setHours(
                0,
                0,
                0,
                0,
              ),
            );
            const endOfDay = new Date(
              new Date(
                new Date().setDate(new Date().getDate() - i + 1),
              ).setHours(0, 0, 0, 0),
            );
            const numCompletedThisDay = countCardsAfterDate(
              history,
              props.card,
              startOfDay,
              endOfDay,
            );
            tempArray.push(
              <CustomCheckbox
                label={middleOfDay.getDate().toString()}
                readOnly={true}
                completed={numCompletedThisDay > 0}
              />,
            );
          }
        }
        return tempArray;
      },
    },
    //X times in a set week, and x times in the last 7 days are different
    XpW: {
      //default calendar week. randomise if less than 7
      enabled: true,
      code: 'XpW',
      name: 'X times in a week',
      explanation: 'Practise a habit X times in a calendar week.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
        //soft start
        //cond 1 - if card created after this Monday, pro rata times contracted vs times actual
        //cond 2 - if card created before this Monday, but after prev Monday, pro rata first week, pro rata current week, average
        //cond 3 - if card created before prev Monday, pro rata this week, average this week and full last week
        const ageOfCardInDays = getAgeOfCardInDays(card.created);
        const lastMonday = new Date(
          new Date(
            new Date().setDate(
              new Date().getDate() - ((new Date().getDay() + 6) % 7),
            ),
          ).setHours(0, 0, 0, 0),
        );
        const lastMondayMinus1 = new Date(
          new Date(
            new Date().setDate(
              new Date().getDate() - ((new Date().getDay() + 6) % 7) - 7,
            ),
          ).setHours(0, 0, 0, 0),
        );
        const daysSinceThisLastMonday = getAgeOfCardInDays(lastMonday);
        //this may be wrong
        if (ageOfCardInDays <= daysSinceThisLastMonday) {
          //cond 1 - math.min is fudge
          const accContractedThisWeek =
            parameters.numberOfTimes * (Math.min(ageOfCardInDays + 1, 7) / 7);
          const accActualThisWeek = countCardsAfterDate(
            history,
            card,
            card.created,
          );
          return Math.min(accActualThisWeek / accContractedThisWeek, 1);
          //this may be wrong
        } else if (ageOfCardInDays <= daysSinceThisLastMonday + 7) {
          //cond 2 - math.min is fudge
          const accContractedThisWeek =
            parameters.numberOfTimes *
            (Math.min(daysSinceThisLastMonday + 1, 7) / 7);
          const accActualThisWeek = countCardsAfterDate(
            history,
            card,
            lastMonday,
          );
          const accContractedFirstWeek =
            parameters.numberOfTimes *
            (Math.min(ageOfCardInDays - daysSinceThisLastMonday + 1, 7) / 7);
          const accActualFirstWeek = countCardsAfterDate(
            history,
            card,
            card.created,
            lastMonday,
          );
          return Math.min(
            (accActualThisWeek / accContractedThisWeek +
              accActualFirstWeek / accContractedFirstWeek) /
              2,
            1,
          );
        } else {
          //cond 3
          const accContractedThisWeek =
            parameters.numberOfTimes *
            (Math.min(daysSinceThisLastMonday + 1, 7) / 7);
          const accActualThisWeek = countCardsAfterDate(
            history,
            card,
            lastMonday,
          );
          const accContractedLastWeek = parameters.numberOfTimes;
          const accActualLastWeek = countCardsAfterDate(
            history,
            card,
            lastMonday,
            lastMondayMinus1,
          );
          return Math.min(
            (accActualThisWeek / accContractedThisWeek +
              accActualLastWeek / accContractedLastWeek) /
              2,
            1,
          );
        }
      },
      progressRenderFunction: (props, history) => {
        const ageOfCardInDays = getAgeOfCardInDays(props.card.created);
        const cardWeeksOldIndex = Math.trunc(ageOfCardInDays / 7);
        let tempArray = [];
        for (let i = cardWeeksOldIndex; i >= 0; i--) {
          const lastMondayMinus1 = new Date(
            new Date(
              new Date().setDate(
                new Date().getDate() - ((new Date().getDay() + 6) % 7) - 7 * i,
              ),
            ).setHours(0, 0, 0, 0),
          );
          const lastMonday = new Date(
            new Date(
              new Date().setDate(
                new Date().getDate() -
                  ((new Date().getDay() + 6) % 7) -
                  7 * (i - 1),
              ),
            ).setHours(0, 0, 0, 0),
          );
          let numberOfCardsInWeek;
          if ((i = 0)) {
            numberOfCardsInWeek = countCardsAfterDate(
              history,
              props.card,
              lastMondayMinus1,
            );
          } else {
            numberOfCardsInWeek = countCardsAfterDate(
              history,
              props.card,
              lastMondayMinus1,
              lastMonday,
            );
          }
          tempArray.push({
            label: `W-${i}`,
            height: props.card.parameters.numberOfTimes,
            completed: numberOfCardsInWeek,
          });
        }
        const componentToRender = <ProgressBarGraph values={tempArray} />;
        return componentToRender;
      },
    },
    RxW: {
      enabled: true,
      code: 'RxW',
      name: 'Roughly x times in a week',
      explanation: 'Practise a habit roughly X times in 7 days.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressFunction: (card, history, parameters) => {
        //soft start
        const ageOfCardInDays = getAgeOfCardInDays(card.created, 14);
        const accActual = countCardsAfterDate(
          history,
          card,
          new Date(
            new Date(
              new Date().setDate(new Date().getDate() - ageOfCardInDays),
            ).setHours(0, 0, 0, 0),
          ),
        );
        const accContracted =
          (ageOfCardInDays / 14) * (parameters.numberOfTimes * 2);
        return Math.min(accActual / accContracted, 1);
      },
    },
    EM: {
      enabled: true,
      code: 'EM',
      name: 'Every month on...',
      explanation: 'Practise a habit on specific days of the month.',
      parameters: {
        dayOfMonth: [],
      },
      progressFunction: (card, history, parameters) => {
        //soft start
        const ageOfCardInDays = getAgeOfCardInDays(card.created, 14);
        let filteredHistory = history.filter(instance => {
          return (instance.uuid = card.uuid);
        });
        let accContracted = 0;
        let accActual = 0;
        for (let i = 0; i < ageOfCardInDays; i++) {
          let date = new Date(new Date().setDate(new Date().getDate() - 1 - i));
          if (parameters.dayOfMonth[date.getDate()]) {
            accContracted++;
          }
          if (
            parameters.dayOfMonth[date.getDate()] &&
            filteredHistory.some(instance => {
              return isSameDay(instance.timestamp, date);
            })
          ) {
            accActual++;
          }
        }
        return Math.min(accActual / accContracted, 1);
      },
    },
    XpM: {
      enabled: true,
      code: 'XpM',
      name: 'X times in a month',
      explanation: 'Practise a habit X times in a calendar month.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressFunction: (card, history, parameters) => {
        //soft start, if card newer than start of previous month, don't count prev month
        //three conditions
        //cond 1 - card newer than start of this month - pro rata days so far
        //cond 2 - card created during previous month - pro rata days this month, pro rata days last month, average
        //cond 3 - card created before previous month - pro rata days this month, count all days last month, average
        const ageOfCardInDays = getAgeOfCardInDays(card.created);
        const firstOfThisMonth = new Date(
          new Date(new Date().setDate(1)).setHours(0, 0, 0, 0),
        );
        const daysSinceFirstOfMonth = getAgeOfCardInDays(firstOfThisMonth);
        const firstOfMonthMinus1 = new Date(
          new Date(new Date().setMonth(new Date().getMonth() - 1, 1)).setHours(
            0,
            0,
            0,
            0,
          ),
        );
        if (ageOfCardInDays <= daysSinceFirstOfMonth) {
          const accActualThisMonth = countCardsAfterDate(
            history,
            card,
            card.created,
          );
          const accContractedThisMonth =
            parameters.numberOfTimes * (ageOfCardInDays / 30);
          return Math.min(accActualThisMonth / accContractedThisMonth, 1);
        } else if (ageOfCardInDays <= daysSinceFirstOfMonth + 30) {
          const accActualThisMonth = countCardsAfterDate(
            history,
            card,
            firstOfThisMonth,
          );
          const accContractedThisMonth =
            parameters.numberOfTimes * (daysSinceFirstOfMonth / 30);
          const accActualLastMonth = countCardsAfterDate(
            history,
            card,
            card.created,
            firstOfThisMonth,
          );
          const accContractedLastMonth =
            parameters.numberOfTimes *
            ((ageOfCardInDays - daysSinceFirstOfMonth) / 30);

          return Math.min(
            (accActualThisMonth / accContractedThisMonth +
              accActualLastMonth / accContractedLastMonth) /
              2,
            1,
          );
        } else {
          const accActualThisMonth = countCardsAfterDate(
            history,
            card,
            firstOfThisMonth,
          );
          const accContractedThisMonth =
            parameters.numberOfTimes * (daysSinceFirstOfMonth / 30);
          const accActualLastMonth = countCardsAfterDate(
            history,
            card,
            firstOfMonthMinus1,
            firstOfThisMonth,
          );
          const accContractedLastMonth = parameters.numberOfTimes;
          return Math.min(
            (accActualThisMonth / accContractedThisMonth +
              accActualLastMonth / accContractedLastMonth) /
              2,
            1,
          );
        }
      },
    },
    RxM: {
      enabled: true,
      code: 'RxM',
      name: 'Roughly x times in a month',
      explanation: 'Practise a habit roughly X times in 30 days.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressFunction: (card, history, parameters) => {
        //soft start if card newer than 30 days calculate fraction
        const ageOfCardInDays = getAgeOfCardInDays(card.created, 30);
        let accActual = countCardsAfterDate(
          history,
          card,
          new Date(
            new Date(
              new Date().setDate(new Date().getDate() - ageOfCardInDays),
            ).setHours(0, 0, 0, 0),
          ),
        );
        return Math.min(
          accActual / (parameters.numberOfTimes * (ageOfCardInDays / 30)),
          1,
        );
      },
    },
    XiY: {
      enabled: true,
      code: 'XiY',
      name: 'X times in every Y days',
      explanation: 'Practise a habit roughly X times in Y days',
      parameters: {
        numberOfTimes: undefined,
        periodInDays: undefined,
      },
      progressFunction: (card, history, parameters) => {
        //soft start*, if card has been created recently not fair to calculate against whole period
        //should be either since the creation of the card, or rolling function of some kind

        const ageOfCardInDays = getAgeOfCardInDays(
          card.created,
          parameters.periodInDays,
        );
        const dateStartOfPeriod = new Date(
          new Date().setDate(new Date().getDate() - ageOfCardInDays),
        );
        const accActual = countCardsAfterDate(history, card, dateStartOfPeriod);
        const accContracted =
          parameters.numberOfTimes * (ageOfCardInDays / periodInDays);
        return Math.min(accActual / accContracted, 1);
      },
    },
    XiT: {
      enabled: true,
      code: 'XiT',
      name: 'X times in total',
      explanation:
        'Practise of a habit X times in total. You may specify a period.',
      parameters: {
        numberOfTimes: undefined,
        //to use this need to record a creation time
        periodInDays: undefined,
      },
      progressFunction: (card, history, parameters) => {
        let accActual = countCardsAfterDate(history, card, card.created);
        return Math.min(accActual / parameters.numberOfTimes, 1);
      },
    },
    SpT: {
      enabled: true,
      code: 'SpT',
      name: 'At a specific time',
      explanation:
        'Schedule the practise of a habit or task for a certain date.',
      parameters: {
        date: undefined,
        //seems like would be easy to miss to have at a specific time here
        timeOfDay: undefined,
      },
      progressFunction: (card, history, parameters) => {
        if (countCardsAfterDate(history, card, card.created) > 0) {
          return 1;
        } else {
          return 0;
        }
      },
    },
    DL: {
      enabled: true,
      code: 'DL',
      name: 'By a deadline',
      explanation: 'Schedule the completion of a habit or task by a deadline.',
      parameters: {
        date: undefined,
      },
      progressFunction: (card, history, parameters) => {
        if (countCardsAfterDate(history, card, card.created) > 0) {
          return 1;
        } else {
          return 0;
        }
      },
    },
    EY: {
      enabled: true,
      code: 'EY',
      name: 'Every year on...',
      explanation: 'Schedule a habit on a certain day of the year.',
      parameters: {
        dayOfYear: {
          day: undefined,
          month: undefined,
        },
      },
      progressFunction: (card, history, parameters) => {
        const filteredHistory = history.filter(instance => {
          return (instance.uuid = card.uuid);
        });
        const ageOfCardInDays = getAgeOfCardInDays(card.created);
        const firstOfThisYear = new Date(new Date().setMonth(0, 1));
        const firstOfPrevYear = new Date(
          new Date(
            new Date().setFullYear(new Date().getFullYear() - 1),
          ).setMonth(0, 1),
        );
        const daysSinceFirstOfThisYear = getAgeOfCardInDays(firstOfThisYear);
        const daysSinceFirstOfPrevYear = getAgeOfCardInDays(firstOfPrevYear);
        if (ageOfCardInDays <= daysSinceFirstOfThisYear) {
          const completedThisYear = filteredHistory.some(instance => {
            return (
              instance.timestamp.getMonth() + 1 ===
                parameters.dayOfYear.month &&
              instance.timestamp.getDate() === parameters.dayOfYear.day &&
              instance.timestamp.getFullYear() === new Date().getFullYear()
            );
          });
          if (completedThisYear) {
            return 1;
          } else {
            return 0;
          }
        } else {
          const completedThisYear = filteredHistory.some(instance => {
            return (
              instance.timestamp.getMonth() + 1 ===
                parameters.dayOfYear.month &&
              instance.timestamp.getDate() === parameters.dayOfYear.day &&
              instance.timestamp.getFullYear() === new Date().getFullYear()
            );
          });
          const completedPrevYear = filteredHistory.some(instance => {
            return (
              instance.timestamp.getMonth() + 1 ===
                parameters.dayOfYear.month &&
              instance.timestamp.getDate() === parameters.dayOfYear.day &&
              instance.timestamp.getFullYear() === new Date().getFullYear() - 1
            );
          });
          if (completedThisYear && completedPrevYear) {
            return 1;
          } else if (completedThisYear || completedPrevYear) {
            return 0.5;
          } else {
            return 0;
          }
        }
      },
    },
    XpY: {
      enabled: true,
      code: 'XpY',
      name: 'X times a year',
      explanation: 'Practise a habit X times in a calendar year.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressFunction: (card, history, parameters) => {
        //three possible cases
        //card created this year
        if (card.created.getFullYear() === new Date().getFullYear()) {
          let accContracted =
            parameters.numberOfTimes *
            ((new Date().getTime() - card.created.getTime()) /
              YEAR_IN_MILLISECONDS);
          let accActual = countCardsAfterDate(history, card, card.created);
          return Math.min(accActual / accContracted, 1);
        }
        //card created last year
        if (card.created.getFullYear() === new Date().getFullYear() - 1) {
          let accActualThisYear = countCardsAfterDate(
            history,
            card,
            new Date(new Date(new Date().setMonth(0, 1)).setHours(0, 0, 0, 0)),
          );
          let accContractedThisYear =
            numberOfTimes *
            ((new Date().getTime() -
              new Date(
                new Date(new Date().setMonth(0, 1)).setHours(0, 0, 0, 0),
              ).getTime()) /
              YEAR_IN_MILLISECONDS);
          let accActualLastYear = countCardsAfterDate(
            history,
            card,
            card.created,
            new Date(new Date().setMonth(0, 1)).setHours(0, 0, 0, 0),
          );
          let accContractedLastYear =
            parameters.numberOfTimes *
            ((new Date(
              new Date(new Date().setMonth(0, 1)).setHours(0, 0, 0, 0),
            ).getTime() -
              card.created.getTime()) /
              YEAR_IN_MILLISECONDS);
          return Math.min(
            (accActualThisYear / accContractedThisYear +
              accActualLastYear / accContractedLastYear) /
              2,
            1,
          );
        }
        //default case - card created before last year
        let accActualThisYear = countCardsAfterDate(
          history,
          card,
          new Date(new Date(new Date().setMonth(0, 1)).setHours(0, 0, 0, 0)),
        );
        let accContractedThisYear =
          parameters.numberOfTimes *
          ((new Date().getTime() -
            new Date(
              new Date(new Date().setMonth(0, 1)).setHours(0, 0, 0, 0),
            ).getTime()) /
            YEAR_IN_MILLISECONDS);
        let accActualLastYear = countCardsAfterDate(
          history,
          card,
          new Date(new Date(new Date().setMonth(-12, 1)).setHours(0, 0, 0, 0)),
          new Date(new Date(new Date().setMonth(0, 1)).setHours(0, 0, 0, 0)),
        );
        let accContractedLastYear = parameters.numberOfTimes;
        return Math.min(
          (accActualThisYear / accContractedThisYear +
            accActualLastYear / accContractedLastYear) /
            2,
          1,
        );
      },
    },
    RxY: {
      enabled: true,
      code: 'RxY',
      name: 'Roughly X times a year',
      explanation: 'Practise a habit roughly X times in 365 days.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressFunction: (card, history, parameters) => {
        let msNow = new Date().getTime();
        let msCreated = card.created.getTime();
        let softStartCoeff = (msNow - msCreated) / YEAR_IN_MILLISECONDS;
        if (softStartCoeff < 1) {
          let accContracted = parameters.numberOfTimes * softStartCoeff;
          let accActual = countCardsAfterDate(history, card, card.created);
          return Math.min(accActual / accContracted, 1);
        } else {
          let accContracted = parameters.numberOfTimes;
          let accActual = countCardsAfterDate(
            history,
            card,
            new Date(new Date().getTime() - YEAR_IN_MILLISECONDS),
          );
          return Math.min(accActual / accContracted, 1);
        }
      },
    },
    AsP: {
      enabled: true,
      code: 'AsP',
      name: 'At some point',
      explanation: 'Something to be completed at some point.',
      parameters: {},
      progressFunction: (card, history, parameters) => {
        if (countCardsAfterDate(history, card, card.created) > 0) {
          return 1;
        } else {
          return 0;
        }
      },
    },
  };
}
