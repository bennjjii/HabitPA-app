import create from 'zustand';
import {persist} from 'zustand/middleware';
import starterCards from '../assets/data/starterCards';
import filterCards from '../utilities/filterCards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CardClass, ModalCode} from '../components/CardClass';
var _ = require('lodash');
import {Bugfender, LogLevel} from '@bugfender/rn-bugfender';
const util = require('util');
Bugfender.init({
  appKey: 'yP8BkuIROGvMqT0cnsfWKgA24Y6V4FIE',
  logUIEvents: true,
  registerErrorHandler: true,
});

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

//this is where the magic happens
//tried to abstract most of the logic up here
type ModalModes = 'EDIT_CARD' | 'BACK_OF_CARD' | undefined;

export interface HistoryItem {
  uuid: string;
  timestamp: Date;
}

export interface TimesOfDay {
  Morning: [number, number];
  Afternoon: [number, number];
  Evening: [number, number];
  Bedtime: [number, number];
}

interface PersistentStore {
  deck: CardClass[];
  history: HistoryItem[];
  addCardToDeck: (card: CardClass) => void;
  editCard: (updatedCard: CardClass) => void;
  deleteCardFromDeck: (cardToDelete: CardClass) => void;
  pushCardToHistory: (card: CardClass) => void;
  getFullDeck: () => CardClass[];
  getFilteredDeck: () => CardClass[];
  getComingUpDeck: () => CardClass[];
  getInactiveDeck: () => CardClass[];
  getBackburnerDeck: () => CardClass[];
  timesOfDay: TimesOfDay;
  logHistory: () => void;
  logDeck: () => void;
  logFilteredDeck: () => void;
  logPersistantVariables: () => void;
}

export const usePersistentStore = create<PersistentStore>(
  persist(
    (set, get) => ({
      deck: [...starterCards],
      addCardToDeck: card =>
        set(state => {
          return {
            deck: [
              ...state.deck,
              {
                ...card,
              },
            ],
          };
        }),
      editCard: updatedCard => {
        let oldDeck = get().deck;
        let newDeck = oldDeck.map(card => {
          if (card.uuid === updatedCard.uuid) {
            return updatedCard;
          } else {
            return card;
          }
        });
        set(state => ({deck: []}));
        set(state => ({deck: newDeck}));
      },
      deleteCardFromDeck: cardToDelete => {
        set(state => {
          return {
            deck: state.deck.filter(card => {
              return cardToDelete.uuid !== card.uuid;
            }),
          };
        });
      },
      history: [],
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
      //get piles
      getFullDeck: () => {
        return get().deck;
      },
      getFilteredDeck: () => {
        return filterCards(get().deck, get().history, get().timesOfDay);
      },
      getComingUpDeck: () => {
        return get().deck.filter(card => true);
      },
      getInactiveDeck: () => {
        return get().deck.filter(card => !card.current);
      },
      getBackburnerDeck: () => {
        return get().deck.filter(card => card.backburner);
      },
      //time of day
      timesOfDay: {
        Morning: [7, 12],
        Afternoon: [13, 17],
        Evening: [18, 22],
        Bedtime: [22, 23],
      },
      //-------------------------------------------------------------------------------
      // Logging
      //-------------------------------------------------------------------------------
      logHistory: () => {
        if (global.enableLogging) {
          console.log('History:');
          get().history.forEach(item => console.log(item));
          console.log(new Date());
          console.log('\n');
        }
      },
      logDeck: () => {
        if (global.enableLogging) {
          console.log('Deck:');
          console.log('\n');
          get().deck.forEach(item => {
            console.log('\n');
            console.log('-----------------------------');
            let mergedCard = _.flatMap(item);
            Object.keys(mergedCard).forEach((item2, index) => {
              if (index !== 7) {
                console.log(mergedCard[item2]);
              }
            });
            console.log(item.parameters);
            console.log('-----------------------------');
          });
        }
      },
      logFilteredDeck: () => {
        if (global.enableLogging) {
          console.log('Filtered deck:');
          console.log('\n');
          const filteredDeck = get().getFilteredDeck();
          filteredDeck.forEach((item, index) => {
            console.log('\n');
            console.log('-----------------------------');
            console.log('Index: ', index);
            let mergedCard = _.flatMap(item);
            Object.keys(mergedCard).forEach(item2 => {
              console.log(mergedCard[item2]);
            });
            console.log('-----------------------------');
          });
          console.log('\n');
        }
      },
      logPersistantVariables: () => {
        let emptyLog = [];
        emptyLog.push('History:');
        get().history.forEach(item => emptyLog.push(item));

        emptyLog.push(new Date().toString());
        emptyLog.push('-');
        emptyLog.push('\n');
        emptyLog.push('\n');
        emptyLog.push('\n');
        emptyLog.push('Deck:');
        emptyLog.push('\n');
        get().deck.forEach(item => {
          emptyLog.push('\n');
          emptyLog.push('-----------------------------');
          let mergedCard = _.flatMap(item);
          Object.keys(mergedCard).forEach((item2, index) => {
            if (item2 === 'name') {
              emptyLog.push('Anonymised card');
              return;
            }
            if (index !== 7) {
              emptyLog.push(mergedCard[item2]);
            }
          });
          emptyLog.push(util.inspect(item.parameters));
          emptyLog.push('-----------------------------');
        });
        emptyLog.push('\n');
        emptyLog.push('\n');
        emptyLog.push('\n');
        emptyLog.push('Filtered deck:');
        emptyLog.push('\n');
        const filteredDeck = filterCards(
          get().deck,
          get().history,
          get().timesOfDay,
        );
        filteredDeck.forEach((item, index) => {
          emptyLog.push('\n');
          emptyLog.push('-----------------------------');
          emptyLog.push('Index: ', index);
          let mergedCard = _.flatMap(item);
          Object.keys(mergedCard).forEach(item2 => {
            if (item2 === 'name') {
              emptyLog.push('Anonymised card');
              return;
            }
            emptyLog.push(mergedCard[item2]);
          });
          emptyLog.push('-----------------------------');
        });
        emptyLog.push('\n');
        Bugfender.log(emptyLog.join('\n'));
      },
    }),
    {
      name: 'appContext',
      getStorage: () => AsyncStorage,
      deserialize: str => JSON.parse(str, dateReviver),
    },
  ),
);

interface NonPersistentStore {
  modalCode: ModalCode | undefined;
  modalMode: ModalModes;
  cardInFocus: CardClass | undefined;
  hideModal: () => void;
  showAddOrEditModal: (modalCode: ModalCode, cardInFocus?: CardClass) => void;
  showBackOfCardModal: (cardInFocus: CardClass) => void;
  switchFromBackOfCardModalToAddOrEdit: (cardInFocus: CardClass) => void;
  //
  logCardUnderInspection: () => void;
  logNonPersistantVariables: () => void;
}

export const useNonPersistentStore = create<NonPersistentStore>((set, get) => ({
  //-------------------------------------------------------------------------------
  // Modals
  //-------------------------------------------------------------------------------
  modalCode: undefined,
  modalMode: undefined,
  cardInFocus: undefined,
  hideModal: () => {
    set(() => ({
      modalMode: undefined,
      modalCode: undefined,
    }));
  },
  showAddOrEditModal: (modalCode, cardInFocus) => {
    set(() => ({
      modalMode: 'EDIT_CARD',
      modalCode: modalCode,
      cardInFocus: cardInFocus,
    }));
  },
  showBackOfCardModal: cardInFocus => {
    set(() => ({
      modalMode: 'BACK_OF_CARD',
      modalCode: undefined,
      cardInFocus: cardInFocus,
    }));
  },
  switchFromBackOfCardModalToAddOrEdit: cardInFocus => {
    set(() => ({
      modalMode: 'EDIT_CARD',
      modalCode: cardInFocus.code,
      cardInFocus: cardInFocus,
    }));
  },
  //
  //-------------------------------------------------------------------------------
  // Logging
  //-------------------------------------------------------------------------------
  logCardUnderInspection: () => {
    if (global.enableLogging) {
      console.log(get().cardInFocus);
    }
  },
  logNonPersistantVariables: () => {
    let emptyLog = [];
    Bugfender.log(emptyLog);
  },
}));
