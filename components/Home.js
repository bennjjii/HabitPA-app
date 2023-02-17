import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Deck from './Deck';
import Modal from 'react-native-modal';
// import Piles from './Piles';
import Piles2 from './Piles2';
// import ToolingPage from './ToolingPage';
import Entypo from 'react-native-vector-icons/Entypo';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AddCard from './AddCard';
import colours from '../assets/colours/colours';

import AddOrEditCardForm from './AddOrEditCardForm';
import BackOfCard from './BackOfCard';
import ToolingPage from './ToolingPage';
import DeckIcon from '../assets/deckXL.png';
import AddCardIcon from '../assets/addcardXL.png';
import ProgressIcon from '../assets/progressXL.png';
import DeckIconDim from '../assets/deckDimmed.png';
import AddCardIconDim from '../assets/addcardDimmed.png';
import ProgressIconDim from '../assets/progressDimmed.png';
import {
  useNonPersistentStore,
  usePersistentStore,
} from '../services/zustandContext';

Entypo.loadFont();

const Tab = createBottomTabNavigator();

const Home = () => {
  const {modalMode, hideModal, modalCode, cardInFocus} =
    useNonPersistentStore();

  const {history} = usePersistentStore();

  return (
    <>
      {/* <Tutorial navigationCtx={navigation} /> */}
      <Tab.Navigator
        id={'mTabNavigator'}
        screenOptions={{
          tabBarShowLabel: false,
          showLabel: false,
          tabBarStyle: [{height: 85}, {backgroundColor: colours.mainUiBrown}],
          tabBarLabelStyle:
            Platform.OS === 'android'
              ? {
                  marginBottom: 15,
                }
              : {},
          //this could cause problems
          lazy: false,
        }}
        // initialRouteName={'Add Card'}
      >
        <Tab.Screen
          name="Deck"
          component={Deck}
          options={{
            headerShown: false,
            // tabBarIcon: () => <Entypo name="documents" size={32} />,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image source={DeckIcon} style={styles.icon} />
              ) : (
                <Image source={DeckIconDim} style={styles.icon} />
              ),
          }}
        />
        <Tab.Screen
          name="Add Card"
          component={AddCard}
          options={{
            headerShown: false,
            // tabBarIcon: () => <Entypo name="hour-glass" size={32} />,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image source={AddCardIcon} style={styles.icon} />
              ) : (
                <Image source={AddCardIconDim} style={styles.icon} />
              ),
          }}
        />
        <Tab.Screen
          name="Piles"
          component={Piles2}
          options={{
            headerShown: false,
            // tabBarIcon: () => <Entypo name="gauge" size={32} />,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image source={ProgressIcon} style={styles.icon} />
              ) : (
                <Image source={ProgressIconDim} style={styles.icon} />
              ),
          }}
        />
        {global.enableTooling && (
          <Tab.Screen
            name="Tooling"
            component={ToolingPage}
            options={{
              headerShown: false,
              tabBarIcon: () => <Entypo name="code" size={32} />,
            }}
          />
        )}
      </Tab.Navigator>
      <Modal
        isVisible={!!modalMode}
        style={styles.modal}
        onRequestClose={() => {
          hideModal();
        }}
        onBackdropPress={() => {
          hideModal();
        }}
        presentationStyle={'formSheet'}
        transparent={true}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}>
        {modalMode === 'EDIT_CARD' && (
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'android' ? undefined : 'position'}>
            <AddOrEditCardForm
              sourceTab="Deck"
              modalCode={modalCode}
              cardInFocus={cardInFocus}
            />
          </KeyboardAvoidingView>
        )}
        {modalMode === 'BACK_OF_CARD' && (
          <BackOfCard cardInFocus={cardInFocus} history={history} />
        )}
      </Modal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  icon: {},
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
