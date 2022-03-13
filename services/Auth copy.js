import createDataContext from './createDataContext';

const authReducer = (prevState, action) => {
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
};

const register = async data => {};
const signIn = async data => {
  dispatch({type: 'SIGN_IN', userToken: 'token_1'});
};
const signOut = async data => {
  dispatch({type: 'SIGN_OUT'});
};
const getUser = () => state.userToken;
const getBananaValidity = () => state.banana;

export const {Provider, Context} = createDataContext(
  authReducer,
  {register, signIn, signOut, getUser, getBananaValidity},
  {userToken: null, banana: true},
);
