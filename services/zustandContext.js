import create from 'zustand';
import {Day, TimeOfDay} from '../utilities/enums';
import testCards from '../assets/data/testCards2';

export const useStore = create(set => ({
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
          },
        ],
      };
    }),
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
  //modals
  modalVisible: false,
  modalCode: undefined,
  toggleModalVisible: () => {
    set(state => ({modalVisible: !state.modalVisible}));
  },
  showModal: code => {
    set(state => ({
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
