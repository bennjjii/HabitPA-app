//consider replacing this with zustand, looks much simpler

import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_OUT':
      return {token: null, email: ''};
    case 'SIGN_IN':
      return {
        token: action.token,
        email: action.email,
      };
    default:
      return state;
  }
};

const signin = dispatch => {
  return ({email, password}) => {
    dispatch({
      type: 'SIGN_IN',
      token: 'some access token here',
      email,
    });
  };
};

const signout = dispatch => {
  return () => {
    dispatch({type: 'SIGN_OUT'});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout},
  {token: null, email: '', time: '12P', day: 'M'},
);
