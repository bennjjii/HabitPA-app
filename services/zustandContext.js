import create from 'zustand';
import {persist} from 'zustand/middleware';
import testCards from '../assets/data/testCards2';
import filterCards from '../utilities/filterCards';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
var _ = require('lodash');
//use immer

const dateReviver = (key, value) => {
  // If the value is a string and if it roughly looks like it could be a
  // JSON-style date string go ahead and try to parse it as a Date object.
  if (
    'string' === typeof value &&
    /^\d{4}-[01]\d-[0-3]\dT[012]\d(?::[0-6]\d){2}\.\d{3}Z$/.test(value)
  ) {
    var date = new Date(value);
    // If the date is valid then go ahead and return the date object.
    if (+date === +date) {
      return date;
    }
  }
  // If a date was not returned, return the value that was passed in.
  return value;
};

export const useStore = create(
  persist(
    (set, get) => ({
      deck: [...testCards],
      addCardToDeck: card =>
        set(state => {
          return {
            deck: [
              ...state.deck,
              {
                uuid: uuid.v4(),
                ...card,
                created: new Date(),
                current: true,
              },
            ],
          };
        }),
      history: [
        {uuid: 2, timestamp: new Date(2022, 3, 13)},
        {uuid: 2, timestamp: new Date(2022, 3, 12)},
        {uuid: 2, timestamp: new Date(2022, 3, 10)},
        {uuid: 2, timestamp: new Date(2022, 3, 9)},
      ],
      pushCardToHistory: card => {
        set(state => {
          return {
            history: [
              ...state.history,
              {
                uuid: card.uuid,
                timestamp: new Date(),
              },
            ],
          };
        });
      },
      getFilteredDeck: () => {
        return filterCards(get().deck, get().history, get().timesOfDay);
      },
      //time of day
      timesOfDay: {
        Morning: [7, 12],
        Afternoon: [13, 17],
        Evening: [18, 22],
        Night: [22, 23],
      },
      //modals
      modalVisible: false,
      modalCode: undefined,
      toggleModalVisible: () => {
        set(state => ({modalVisible: !state.modalVisible}));
      },
      showModal: code => {
        set(() => ({
          modalVisible: true,
          modalCode: code,
        }));
      },
      hideModal: () => {
        set(() => ({
          modalVisible: false,
          modalCode: undefined,
        }));
      },
      // Pretty print logging functions
      logHistory: () => {
        console.log('History:');
        get().history.forEach(item => console.log(item));
        console.log(new Date());
        console.log('\n');
      },
      logDeck: () => {
        console.log('Deck:');
        console.log('\n');
        get().deck.forEach(item => {
          console.log('\n');
          console.log('-----------------------------');
          let mergedCard = _.flatMap(item);
          Object.keys(mergedCard).forEach(item2 => {
            console.log(mergedCard[item2]);
          });
          console.log('-----------------------------');
        });
      },
    }),
    {
      name: 'appContext',
      getStorage: () => AsyncStorage,
      deserialize: str => JSON.parse(str, dateReviver),
    },
  ),
);
