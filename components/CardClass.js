import uuid from 'react-native-uuid';
import countCardsAfterDate from '../utilities/countCardsAfterDate';
import getAgeOfCardInDays from '../utilities/getAgeOfCardInDays';

import PixelCheckbox from './PixelCheckbox';
// import ProgressBarGraph from './ProgressBarGraph';
import ProgressBarGraph from './ProgressBarGraph2';
import React from 'react';
import colours from '../assets/colours/colours';

const YEAR_IN_MILLISECONDS = 31557600000;

const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const convertToLevel = coefficient => {
  return Math.floor(Math.max(Math.min(coefficient || 0, 1) * 99, 1));
};

const trimArray = (arr, n) => {
  arr.reverse();
  if (arr.length > n) {
    arr.length = n;
  }
  arr.reverse();
  return arr;
};

const getAgeOfCardInMonths = card => {
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const dateCardCreated = card.created.getDate();
  const monthCardCreated = card.created.getMonth();
  const yearCardCreated = card.created.getFullYear();
  const yearMultiplier = currentYear - yearCardCreated;
  const numberOfTwelveMonths = 12 * yearMultiplier;
  let monthsDifference;
  if (currentDate >= dateCardCreated) {
    monthsDifference = currentMonth - monthCardCreated;
  } else {
    monthsDifference = currentMonth - monthCardCreated - 1;
  }
  return Math.max(numberOfTwelveMonths + monthsDifference, 0);
};

const getAgeOfCardInYears = card => {
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const dateCardCreated = card.created.getDate();
  const monthCardCreated = card.created.getMonth();
  const yearCardCreated = card.created.getFullYear();
  let yearsDifference;
  if (currentDate >= dateCardCreated && currentMonth >= monthCardCreated) {
    yearsDifference = currentYear - yearCardCreated;
  } else {
    yearsDifference = currentYear - yearCardCreated - 1;
  }
  return Math.max(yearsDifference, 0);
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
        Bedtime: newCard?.parameters.timeOfDay?.Bedtime || false,
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
      backOfCardColour: colours.backOfCardPalette[0],
      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'Every day',
      explanation: 'Practise a habit every day. You may choose the time of day',
      parameters: {
        timeOfDay: [undefined],
      },
      //we pass parameters, when it is already passed as part of card
      //not a problem, but redundant
      progressCoeffFunction: (card, history, parameters) => {
        //soft start
        //what percentage of last 7 days has habit been observed
        let contractedCardsPerDay = Object.keys(
          card.parameters.timeOfDay,
        ).filter(timeOfDay => {
          return card.parameters.timeOfDay[timeOfDay];
        }).length;
        if (contractedCardsPerDay == 0) {
          contractedCardsPerDay = 1;
        }
        const ageOfCardInDays = getAgeOfCardInDays(card.created, 7);
        let accActual = 0;
        for (let i = ageOfCardInDays; i >= 0; i--) {
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
              new Date().setDate(new Date().getDate() - (i + 1)),
            ).setHours(0, 0, 0, 0),
          );
          const numCardsInThisDay = countCardsAfterDate(
            history,
            card,
            startOfDay,
            endOfDay,
          );
          const ratioForToday = Math.min(
            numCardsInThisDay / contractedCardsPerDay,
            1,
          );
          accActual += ratioForToday;
        }
        return convertToLevel(accActual / ageOfCardInDays);
      },
      contractRenderFunction: props => {
        const timesOfDayBeingUsed = Object.keys(
          props.card.parameters.timeOfDay,
        ).some(timeOfDay => {
          return props.card.parameters.timeOfDay[timeOfDay];
        });
        const whichTimesOfDayBeingUsed = Object.keys(
          props.card.parameters.timeOfDay,
        ).filter(timeOfDay => props.card.parameters.timeOfDay[timeOfDay]);
        if (timesOfDayBeingUsed) {
          switch (whichTimesOfDayBeingUsed.length) {
            case 1:
              return `Practise this habit every ${whichTimesOfDayBeingUsed[0].toLowerCase()}`;
            case 2:
              return `Practise this habit each ${whichTimesOfDayBeingUsed[0].toLowerCase()} and ${whichTimesOfDayBeingUsed[1].toLowerCase()}`;
            case 3:
              return `Practise this habit each ${whichTimesOfDayBeingUsed[0].toLowerCase()}, ${whichTimesOfDayBeingUsed[1].toLowerCase()} and ${whichTimesOfDayBeingUsed[2].toLowerCase()}`;
            case 4:
              return `Practise this habit each ${whichTimesOfDayBeingUsed[0].toLowerCase()}, ${whichTimesOfDayBeingUsed[1].toLowerCase()}, ${whichTimesOfDayBeingUsed[2].toLowerCase()} and ${whichTimesOfDayBeingUsed[2].toLowerCase()}`;
          }
        } else {
          return 'Practise this habit every day';
        }
      },
      progressRenderFunction: (props, history, color) => {
        //just count if user has done card twice in day etc
        let contractedCardsPerDay = Object.keys(
          props.card.parameters.timeOfDay,
        ).filter(timeOfDay => {
          return props.card.parameters.timeOfDay[timeOfDay];
        }).length;
        if (contractedCardsPerDay == 0) {
          contractedCardsPerDay = 1;
        }
        const ageOfCardInDays = getAgeOfCardInDays(props.card.created, 6);
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
            countCardsAfterDate(history, props.card, startOfDay, endOfDay) >=
            contractedCardsPerDay;
          tempArray.push({
            day: middleOfDay.toString()[0],
            completed: cardCompletedToday,
            today: i == 0 ? true : false,
          });
        }
        const componentToRender = tempArray.map(item => (
          <PixelCheckbox
            label={item.day}
            readOnly={true}
            completed={item.completed}
            today={item.today}
            greyColor={color}
          />
        ));

        return componentToRender;
      },
    },
    XpD: {
      enabled: true,
      code: 'XpD',
      backOfCardColour: colours.backOfCardPalette[1],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'X times a day',
      explanation: 'Practise a habit a number of times, every day',
      parameters: {
        numberOfTimes: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
        //soft start
        const ageOfCardInDays = getAgeOfCardInDays(card.created, 7);
        return convertToLevel(
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
        );
      },
      contractRenderFunction: props => {
        if (props.card.parameters.numberOfTimes == 1) {
          return 'Practise this habit once a day';
        } else {
          return `Practise this habit ${props.card.parameters.numberOfTimes} times a day`;
        }
      },
      progressRenderFunction: (props, history, color) => {
        const ageOfCardInDays = getAgeOfCardInDays(props.card.created, 4);
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
        tempArray.reverse();
        const componentToRender = (
          <ProgressBarGraph values={tempArray} greyColor={color} />
        );
        return componentToRender;
      },
    },
    EW: {
      enabled: true,
      code: 'EW',
      backOfCardColour: colours.backOfCardPalette[2],

      backOfCardColourFgColour: colours.pixelTextFg2,
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
          return instance.uuid == card.uuid;
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

        return convertToLevel(accActual / accContracted);
      },
      contractRenderFunction: props => {
        let whichDaysOfWeekBeingUsed = Object.keys(
          props.card.parameters.dayOfWeek,
        ).filter(dayOfWeek => props.card.parameters.dayOfWeek[dayOfWeek]);
        whichDaysOfWeekBeingUsed.reverse();
        let accString = 'Practise this habit on ';
        if (whichDaysOfWeekBeingUsed.length == 1) {
          return `Practise this habit on ${whichDaysOfWeekBeingUsed[0]}s`;
        } else {
          for (let i = whichDaysOfWeekBeingUsed.length - 1; i >= 0; i--) {
            if (i == 0) {
              accString += `and ${whichDaysOfWeekBeingUsed[i]}s`;
            } else {
              accString += `${whichDaysOfWeekBeingUsed[i]}s, `;
            }
          }
        }
        return accString;
      },
      progressRenderFunction: (props, history, color) => {
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
              <PixelCheckbox
                label={middleOfDay.getDate().toString()}
                readOnly={true}
                completed={numCompletedThisDay > 0}
                today={i == 0 ? true : false}
                greyColor={color}
              />,
            );
          }
        }
        //clamp

        return trimArray(tempArray, 7);
      },
    },
    //X times in a set week, and x times in the last 7 days are different
    XpW: {
      //default calendar week. randomise if less than 7
      enabled: true,
      code: 'XpW',
      backOfCardColour: colours.backOfCardPalette[3],
      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'X times in a week',
      explanation: 'Practise a habit X times in a calendar week.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
        //TODO refine this function
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
          return convertToLevel(accActualThisWeek / accContractedThisWeek);
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
          return convertToLevel(
            (accActualThisWeek / accContractedThisWeek ||
              0 + accActualFirstWeek / accContractedFirstWeek ||
              0) / 2,
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
          return convertToLevel(
            (accActualThisWeek / accContractedThisWeek ||
              0 + accActualLastWeek / accContractedLastWeek ||
              0) / 2,
          );
        }
      },
      contractRenderFunction: props => {
        return `Practise this habit ${props.card.parameters.numberOfTimes} times in each week`;
      },
      progressRenderFunction: (props, history, color) => {
        const ageOfCardInDays = getAgeOfCardInDays(props.card.created, 30);
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
          if (i == 0) {
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
            label: `W-${i.toString()}`,
            height: props.card.parameters.numberOfTimes,
            completed: numberOfCardsInWeek,
          });
        }
        tempArray = trimArray(tempArray, 4);
        tempArray.reverse();
        const componentToRender = (
          <ProgressBarGraph values={tempArray} greyColor={color} />
        );
        return componentToRender;
      },
    },
    RxW: {
      enabled: true,
      code: 'RxW',
      backOfCardColour: colours.backOfCardPalette[4],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'Roughly x times in a week',
      explanation: 'Practise a habit roughly X times in 7 days.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
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
        return convertToLevel(accActual / accContracted);
      },
      contractRenderFunction: props => {
        return `Practise this habit roughly ${props.card.parameters.numberOfTimes} times in 7 days`;
      },
      progressRenderFunction: (props, history, color) => {
        const ageOfCardInDays = getAgeOfCardInDays(props.card.created, 30);
        const cardWeeksOldIndex = Math.trunc(ageOfCardInDays / 7);
        let tempArray = [];
        for (let i = cardWeeksOldIndex; i >= 0; i--) {
          const fourteenDaysAgo = new Date(
            new Date(
              new Date().setDate(new Date().getDate() - 7 * (i + 1)),
            ).setHours(0, 0, 0, 0),
          );
          const sevenDaysAgo = new Date(
            new Date(new Date().setDate(new Date().getDate() - 7 * i)).setHours(
              0,
              0,
              0,
              0,
            ),
          );
          let numberOfCardsInWeek;
          if (i == 0) {
            numberOfCardsInWeek = countCardsAfterDate(
              history,
              props.card,
              fourteenDaysAgo,
            );
          } else {
            numberOfCardsInWeek = countCardsAfterDate(
              history,
              props.card,
              fourteenDaysAgo,
              sevenDaysAgo,
            );
          }
          tempArray.push({
            label: `W-${i.toString()}`,
            height: props.card.parameters.numberOfTimes,
            completed: numberOfCardsInWeek,
          });
        }
        tempArray = trimArray(tempArray, 4);
        tempArray.reverse();
        const componentToRender = (
          <ProgressBarGraph values={tempArray} greyColor={color} />
        );
        return componentToRender;
      },
    },
    EM: {
      enabled: true,
      code: 'EM',
      backOfCardColour: colours.backOfCardPalette[5],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'Every month on...',
      explanation: 'Practise a habit on specific days of the month.',
      parameters: {
        dayOfMonth: [],
      },
      progressCoeffFunction: (card, history, parameters) => {
        //soft start
        const ageOfCardInDays = getAgeOfCardInDays(card.created, 14);
        let filteredHistory = history.filter(instance => {
          return instance.uuid == card.uuid;
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
        return convertToLevel(accActual / accContracted || 0);
      },
      contractRenderFunction: props => {
        let whichDaysOfMonthBeingUsed = Object.keys(
          props.card.parameters.dayOfMonth,
        ).filter(dayOfMonth => props.card.parameters.dayOfMonth[dayOfMonth]);
        whichDaysOfMonthBeingUsed.reverse();

        let accString = 'Practise this habit on the ';
        if (whichDaysOfMonthBeingUsed.length == 1) {
          return `Practise this habit on the ${whichDaysOfMonthBeingUsed[0]}${
            whichDaysOfMonthBeingUsed[0].toString().slice(-1) == '1'
              ? 'st'
              : whichDaysOfMonthBeingUsed[0].toString().slice(-1) == '2'
              ? 'nd'
              : whichDaysOfMonthBeingUsed[0].toString().slice(-1) == '3'
              ? 'rd'
              : 'th'
          }`;
        } else {
          for (let i = whichDaysOfMonthBeingUsed.length - 1; i >= 0; i--) {
            if (i == 0) {
              accString += `and ${whichDaysOfMonthBeingUsed[i]}${
                whichDaysOfMonthBeingUsed[i].toString().slice(-1) == '1'
                  ? 'st'
                  : whichDaysOfMonthBeingUsed[i].toString().slice(-1) == '2'
                  ? 'nd'
                  : whichDaysOfMonthBeingUsed[i].toString().slice(-1) == '3'
                  ? 'rd'
                  : 'th'
              }`;
            } else {
              accString += `${whichDaysOfMonthBeingUsed[i]}${
                whichDaysOfMonthBeingUsed[i].toString().slice(-1) == '1'
                  ? 'st'
                  : whichDaysOfMonthBeingUsed[i].toString().slice(-1) == '2'
                  ? 'nd'
                  : whichDaysOfMonthBeingUsed[i].toString().slice(-1) == '3'
                  ? 'rd'
                  : 'th'
              }, `;
            }
          }
        }
        return accString;
      },
      progressRenderFunction: (props, history, color) => {
        const ageOfCardInDays = getAgeOfCardInDays(props.card.created, 30);
        tempArray = [];
        for (let i = ageOfCardInDays; i >= 0; i--) {
          const middleOfDay = new Date(
            new Date(new Date().setDate(new Date().getDate() - i)).setHours(
              12,
              0,
              0,
              0,
            ),
          );
          const daysOfMonthArray = Object.keys(
            props.card.parameters.dayOfMonth,
          );
          const isDayCounted =
            props.card.parameters.dayOfMonth[middleOfDay.getDate()];
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
              <PixelCheckbox
                label={middleOfDay.getDate().toString()}
                readOnly={true}
                completed={numCompletedThisDay > 0}
                today={i == 0 ? true : false}
                greyColor={color}
              />,
            );
          }
        }
        return trimArray(tempArray, 7);
      },
    },
    XpM: {
      enabled: true,
      code: 'XpM',
      backOfCardColour: colours.backOfCardPalette[6],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'X times in a month',
      explanation: 'Practise a habit X times in a calendar month.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
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
          return convertToLevel(accActualThisMonth / accContractedThisMonth);
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

          // console.log(
          //   accActualThisMonth,
          //   accContractedThisMonth,
          //   accActualLastMonth,
          //   accContractedLastMonth,
          // );
          return convertToLevel(
            (accActualThisMonth / accContractedThisMonth ||
              0 + accActualLastMonth / accContractedLastMonth ||
              0) / 2,
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

          return convertToLevel(
            (accActualThisMonth / accContractedThisMonth ||
              0 + accActualLastMonth / accContractedLastMonth ||
              0) / 2,
          );
        }
      },
      contractRenderFunction: props => {
        return `Practise this habit ${props.card.parameters.numberOfTimes} times in each month`;
      },
      progressRenderFunction: (props, history, color) => {
        const cardMonthsOldIndex = getAgeOfCardInMonths(props.card);

        let tempArray = [];
        for (let i = cardMonthsOldIndex; i >= 0; i--) {
          const beginningOfMonthMinus1 = new Date(
            new Date(
              new Date(
                new Date().setMonth(new Date().getMonth() - 1 * i),
              ).setDate(1),
            ).setHours(0, 0, 0, 0),
          );
          const beginningOfMonth = new Date(
            new Date(
              new Date(
                new Date().setMonth(new Date().getMonth() - 1 * (i - 1)),
              ).setDate(1),
            ).setHours(0, 0, 0, 0),
          );
          let numberOfCardsInMonth;
          if (i == 0) {
            numberOfCardsInMonth = countCardsAfterDate(
              history,
              props.card,
              beginningOfMonthMinus1,
            );
          } else {
            numberOfCardsInMonth = countCardsAfterDate(
              history,
              props.card,
              beginningOfMonthMinus1,
              beginningOfMonth,
            );
          }
          tempArray.push({
            label: `M-${i.toString()}`,
            height: props.card.parameters.numberOfTimes,
            completed: numberOfCardsInMonth,
          });
        }
        tempArray = trimArray(tempArray, 4);
        tempArray.reverse();
        const componentToRender = (
          <ProgressBarGraph values={tempArray} greyColor={color} />
        );
        return componentToRender;
      },
    },
    RxM: {
      enabled: true,
      code: 'RxM',
      backOfCardColour: colours.backOfCardPalette[7],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'Roughly x times in a month',
      explanation: 'Practise a habit roughly X times in 30 days.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
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
        return convertToLevel(
          accActual / (parameters.numberOfTimes * (ageOfCardInDays / 30)),
        );
      },
      contractRenderFunction: props => {
        return `Practise this habit roughly ${props.card.parameters.numberOfTimes} times in 30 days`;
      },
      progressRenderFunction: (props, history, color) => {
        const cardMonthsOldIndex = getAgeOfCardInMonths(props.card);
        let tempArray = [];
        for (let i = cardMonthsOldIndex; i >= 0; i--) {
          const monthAgoMinus1 = new Date(
            new Date(
              new Date().setDate(new Date().getDate() - 30 * (i + 1)),
            ).setHours(0, 0, 0, 0),
          );
          const monthAgo = new Date(
            new Date(
              new Date().setDate(new Date().getDate() - 30 * i),
            ).setHours(0, 0, 0, 0),
          );
          let numberOfCardsInWeek;
          if (i == 0) {
            numberOfCardsInWeek = countCardsAfterDate(
              history,
              props.card,
              monthAgoMinus1,
            );
          } else {
            numberOfCardsInWeek = countCardsAfterDate(
              history,
              props.card,
              monthAgoMinus1,
              monthAgo,
            );
          }
          tempArray.push({
            label: `M-${i.toString()}`,
            height: props.card.parameters.numberOfTimes,
            completed: numberOfCardsInWeek,
          });
        }
        tempArray = trimArray(tempArray, 4);
        tempArray.reverse();
        const componentToRender = (
          <ProgressBarGraph values={tempArray} greyColor={color} />
        );
        return componentToRender;
      },
    },
    XiY: {
      enabled: true,
      code: 'XiY',
      backOfCardColour: colours.backOfCardPalette[8],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'X times in every Y days',
      explanation: 'Practise a habit roughly X times in Y days',
      parameters: {
        numberOfTimes: undefined,
        periodInDays: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
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
          parameters.numberOfTimes *
          (ageOfCardInDays / parameters.periodInDays);
        return convertToLevel(accActual / accContracted);
      },
      contractRenderFunction: props => {
        return `Practise this habit roughly ${props.card.parameters.numberOfTimes} times in ${props.card.parameters.periodInDays} days`;
      },
      progressRenderFunction: (props, history, color) => {
        const ageOfCardInDays = getAgeOfCardInDays(props.card.created);
        const cardMonthsOldIndex = getAgeOfCardInMonths(props.card);
        const cardPeriodsOldIndex = Math.trunc(
          ageOfCardInDays / props.card.parameters.periodInDays,
        );
        let tempArray = [];
        for (let i = cardPeriodsOldIndex; i >= 0; i--) {
          const periodAgoMinus1 = new Date(
            new Date(
              new Date().setDate(
                new Date().getDate() -
                  props.card.parameters.periodInDays * (i + 1),
              ),
            ).setHours(0, 0, 0, 0),
          );
          const periodAgo = new Date(
            new Date(
              new Date().setDate(
                new Date().getDate() - props.card.parameters.periodInDays * i,
              ),
            ).setHours(0, 0, 0, 0),
          );
          let numberOfCardsInWeek;
          if (i == 0) {
            numberOfCardsInWeek = countCardsAfterDate(
              history,
              props.card,
              periodAgoMinus1,
            );
          } else {
            numberOfCardsInWeek = countCardsAfterDate(
              history,
              props.card,
              periodAgoMinus1,
              periodAgo,
            );
          }
          tempArray.push({
            label: `P-${i.toString()}`,
            height: props.card.parameters.numberOfTimes,
            completed: numberOfCardsInWeek,
          });
        }
        tempArray = trimArray(tempArray, 4);
        tempArray.reverse();
        const componentToRender = (
          <ProgressBarGraph values={tempArray} greyColor={color} />
        );
        return componentToRender;
      },
    },
    XiT: {
      enabled: true,
      code: 'XiT',
      backOfCardColour: colours.backOfCardPalette[9],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'X times in total',
      explanation:
        'Practise of a habit X times in total. You may specify a period.',
      parameters: {
        numberOfTimes: undefined,
        //to use this need to record a creation time
        periodInDays: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
        const accActual = countCardsAfterDate(history, card, card.created);
        return convertToLevel(accActual / parameters.numberOfTimes);
      },
      contractRenderFunction: props => {
        return `Practise this habit ${props.card.parameters.numberOfTimes} times in total`;
      },
      progressRenderFunction: (props, history, color) => {
        //sideways graph would be better here
        const accActual = countCardsAfterDate(
          history,
          props.card,
          props.card.created,
        );
        const tempArray = [
          {
            label: 'T',
            height: props.card.parameters.numberOfTimes,
            completed: accActual,
          },
        ];
        const componentToRender = (
          <ProgressBarGraph values={tempArray} greyColor={color} />
        );
        return componentToRender;
      },
    },
    SpT: {
      enabled: true,
      code: 'SpT',
      backOfCardColour: colours.backOfCardPalette[10],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'At a specific time',
      explanation:
        'Schedule the practise of a habit or task for a certain date.',
      parameters: {
        date: undefined,
        //seems like would be easy to miss to have at a specific time here
        // timeOfDay: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
        if (countCardsAfterDate(history, card, card.created) > 0) {
          return 99;
        } else {
          return 1;
        }
      },
      contractRenderFunction: props => {
        return `Practise this habit on ${props.card.parameters.date.toLocaleString(
          'en-GB',
          {dateStyle: 'full'},
        )}`;
      },
      progressRenderFunction: (props, history, color) => {
        const completed =
          countCardsAfterDate(history, props.card, props.card.created) > 0;
        let componentToRender;
        if (!completed) {
          componentToRender = (
            <PixelCheckbox
              label={'not completed...'}
              readOnly={true}
              completed={false}
              greyColor={color}
            />
          );
        } else {
          componentToRender = (
            <PixelCheckbox
              label={'Completed'}
              readOnly={true}
              completed={true}
              greyColor={color}
            />
          );
        }
        return componentToRender;
      },
    },
    DL: {
      enabled: true,
      code: 'DL',
      backOfCardColour: colours.backOfCardPalette[11],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'By a deadline',
      explanation: 'Schedule the completion of a habit or task by a deadline.',
      parameters: {
        date: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
        if (countCardsAfterDate(history, card, card.created) > 0) {
          return 99;
        } else {
          return 1;
        }
      },
      contractRenderFunction: props => {
        return `Complete this task or habit by ${props.card.parameters.date.toLocaleString(
          'en-GB',
          {dateStyle: 'full'},
        )}`;
      },
      progressRenderFunction: (props, history, color) => {
        const completed =
          countCardsAfterDate(history, props.card, props.card.created) > 0;
        let componentToRender;
        if (!completed) {
          componentToRender = (
            <PixelCheckbox
              label={'not completed...'}
              readOnly={true}
              completed={false}
              greyColor={color}
            />
          );
        } else {
          componentToRender = (
            <PixelCheckbox
              label={'Completed'}
              readOnly={true}
              completed={true}
              greyColor={color}
            />
          );
        }
        return componentToRender;
      },
    },
    EY: {
      enabled: true,
      code: 'EY',
      backOfCardColour: colours.backOfCardPalette[12],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'Every year on...',
      explanation: 'Schedule a habit on a certain day of the year.',
      parameters: {
        dayOfYear: {
          day: undefined,
          month: undefined,
        },
      },
      progressCoeffFunction: (card, history, parameters) => {
        const filteredHistory = history.filter(instance => {
          return instance.uuid == card.uuid;
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
            return 99;
          } else {
            return 1;
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
            return 99;
          } else if (completedThisYear || completedPrevYear) {
            return 50;
          } else {
            return 1;
          }
        }
      },
      contractRenderFunction: props => {
        return `Practise this habit on the ${
          props.card.parameters.dayOfYear.day
        }${
          props.card.parameters.dayOfYear.day.toString().slice(-1) == '1'
            ? 'st'
            : props.card.parameters.dayOfYear.day.toString().slice(-1) == '2'
            ? 'nd'
            : props.card.parameters.dayOfYear.day.toString().slice(-1) == '3'
            ? 'rd'
            : 'th'
        } of ${new Date(
          new Date().setMonth(props.card.parameters.dayOfYear.month - 1),
        ).toLocaleString('en-GB', {month: 'long'})}`;
      },
      progressRenderFunction: (props, history, color) => {
        //checkbox - if created this year just this year
        //if created last year also last year
        const filteredHistory = history.filter(instance => {
          return instance.uuid == props.card.uuid;
        });
        const naiveYearsOld =
          new Date().getFullYear() - props.card.created.getFullYear();
        const tempArray = [];
        for (let i = naiveYearsOld; i >= 0; i--) {
          const year = new Date(
            new Date().setFullYear(new Date().getFullYear() - i),
          );
          const completedThisYear = filteredHistory.some(instance => {
            instance.timestamp.getMonth() + 1 ===
              props.card.parameters.dayOfYear.month &&
              instance.timestamp.getDate() ===
                props.card.parameters.dayOfYear.day &&
              instance.timestamp.getFullYear() === year.getFullYear();
          });
          tempArray.push(
            <PixelCheckbox
              label={year.getFullYear().toString()}
              readOnly={true}
              completed={completedThisYear}
              today={i == 0 ? true : false}
              greyColor={color}
            />,
          );
          return trimArray(tempArray, 4);
        }
      },
    },
    XpY: {
      enabled: true,
      code: 'XpY',
      backOfCardColour: colours.backOfCardPalette[13],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'X times a year',
      explanation: 'Practise a habit X times in a calendar year.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
        //three possible cases
        //card created this year
        if (card.created.getFullYear() === new Date().getFullYear()) {
          let accContracted =
            parameters.numberOfTimes *
            ((new Date().getTime() - card.created.getTime()) /
              YEAR_IN_MILLISECONDS);
          let accActual = countCardsAfterDate(history, card, card.created);
          return convertToLevel(accActual / accContracted);
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
          return convertToLevel(
            (accActualThisYear / accContractedThisYear ||
              0 + accActualLastYear / accContractedLastYear ||
              0) / 2,
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
        return convertToLevel(
          (accActualThisYear / accContractedThisYear ||
            0 + accActualLastYear / accContractedLastYear ||
            0) / 2,
        );
      },
      contractRenderFunction: props => {
        return `Practise this habit ${props.card.parameters.numberOfTimes} times in a calendar year`;
      },
      progressRenderFunction: (props, history, color) => {
        //bar graphs
        //get age of card in years

        const naiveYearsOld =
          new Date().getFullYear() - props.card.created.getFullYear();
        const tempArray = [];
        for (let i = naiveYearsOld; i >= 0; i--) {
          const startOfYearMinus1 = new Date(
            new Date(
              new Date(
                new Date().setFullYear(new Date().getFullYear() - i),
              ).setMonth(0, 1),
            ).setHours(0, 0, 0, 0),
          );
          const startOfYear = new Date(
            new Date(
              new Date(
                new Date().setFullYear(new Date().getFullYear() - (i - 1)),
              ).setMonth(0, 1),
            ).setHours(0, 0, 0, 0),
          );
          let numCardsThisYear;
          if (i == 0) {
            numCardsThisYear = countCardsAfterDate(
              history,
              props.card,
              startOfYearMinus1,
            );
          } else {
            numCardsThisYear = countCardsAfterDate(
              history,
              props.card,
              startOfYearMinus1,
              startOfYear,
            );
          }

          tempArray.push({
            label: startOfYearMinus1.getFullYear(),
            height: props.card.parameters.numberOfTimes,
            completed: numCardsThisYear,
          });
        }
        tempArray = trimArray(tempArray, 4);
        tempArray.reverse();
        const componentToRender = (
          <ProgressBarGraph values={tempArray} greyColor={color} />
        );
        return componentToRender;
      },
    },
    RxY: {
      enabled: true,
      code: 'RxY',
      backOfCardColour: colours.backOfCardPalette[14],

      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'Roughly X times a year',
      explanation: 'Practise a habit roughly X times in 365 days.',
      parameters: {
        numberOfTimes: undefined,
      },
      progressCoeffFunction: (card, history, parameters) => {
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
          return convertToLevel(accActual / accContracted);
        }
      },
      contractRenderFunction: props => {
        return `Practise this habit roughly ${props.card.parameters.numberOfTimes} times in 365 days`;
      },
      progressRenderFunction: (props, history, color) => {
        //bar graph for each period
        const ageOfCardInYears = getAgeOfCardInYears(props.card);
        const tempArray = [];
        for (let i = ageOfCardInYears; i >= 0; i--) {
          const startOfYearMinus1 = new Date(
            new Date(
              new Date().setTime(
                new Date().getTime() - (i + 1) * YEAR_IN_MILLISECONDS,
              ),
            ).setHours(0, 0, 0, 0),
          );
          const startOfYear = new Date(
            new Date(
              new Date().setTime(
                new Date().getTime() - i * YEAR_IN_MILLISECONDS,
              ),
            ).setHours(0, 0, 0, 0),
          );
          let numCardsThisYear;
          if (i == 0) {
            numCardsThisYear = countCardsAfterDate(
              history,
              props.card,
              startOfYearMinus1,
            );
          } else {
            numCardsThisYear = countCardsAfterDate(
              history,
              props.card,
              startOfYearMinus1,
              startOfYear,
            );
          }

          tempArray.push({
            label: `Y-${i}`,
            height: props.card.parameters.numberOfTimes,
            completed: numCardsThisYear,
          });
        }
        tempArray = trimArray(tempArray, 4);
        tempArray.reverse();
        const componentToRender = (
          <ProgressBarGraph values={tempArray} greyColor={color} />
        );
        return componentToRender;
      },
    },
    AsP: {
      enabled: true,
      code: 'AsP',
      backOfCardColour: colours.backOfCardPalette[15],
      backOfCardColourFgColour: colours.pixelTextFg1,
      name: 'At some point',
      explanation: 'Something to be completed at some point.',
      parameters: {},
      progressCoeffFunction: (card, history, parameters) => {
        if (countCardsAfterDate(history, card, card.created) > 0) {
          return 99;
        } else {
          return 1;
        }
      },
      contractRenderFunction: props => {
        return `Do this at some point`;
      },
      progressRenderFunction: (props, history, color) => {
        const completed =
          countCardsAfterDate(history, props.card, props.card.created) > 0;
        let componentToRender;
        if (!completed) {
          componentToRender = (
            <PixelCheckbox
              label={'not completed...'}
              readOnly={true}
              completed={false}
              greyColor={color}
            />
          );
        } else {
          componentToRender = (
            <PixelCheckbox
              label={'Completed'}
              readOnly={true}
              completed={true}
              greyColor={color}
            />
          );
        }
        return componentToRender;
      },
    },
  };
}
