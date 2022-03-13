import React from 'react';
import {useContext} from 'react/cjs/react.production.min';
const bcrypt = require('bcrypt');

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const [state, dispatch] = React.useReducer(
  (prevState, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...prevState,
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          userToken: null,
        };
    }
  },
  {
    userToken: null,
    banana: true,
  },
);

const useContextDefinition = React.useMemo(() => {
  return {
    register: async data => {},
    signIn: async data => {
      dispatch({type: 'SIGN_IN', userToken: 'token_1'});
    },
    signOut: async data => {
      dispatch({type: 'SIGN_OUT'});
    },
    getUser: () => state.userToken,
    getBananaValidity: () => state.banana,
  };
});

export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={useContextDefinition}>
      {children}
    </AuthContext.Provider>
  );
};
