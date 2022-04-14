import create from 'zustand';
import {persist} from 'zustand/middleware';
import testCards from '../assets/data/testCards2';
import filterCards from '../utilities/filterCards';
//use immer

export const useStore = create((set, get) => ({
  deck: [...testCards],
  addCardToDeck: card =>
    set(state => {
      return {
        deck: [
          ...state.deck,
          {
            uuid: card.uuid,
            code: card.code,
            name: card.name,
            desc: card.desc,
            parameters: card.parameters,
            created: new Date(),
            valid: true,
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
    return filterCards(
      get().deck,
      get().history,
      get().Morning,
      get().Afternoon,
      get().Evening,
      get().Night,
    );
  },
  //time of day
  Morning: [7, 12],
  Afternoon: [13, 17],
  Evening: [18, 22],
  Night: [22, 23],
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
}));
