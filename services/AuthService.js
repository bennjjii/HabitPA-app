import React from 'react';

export const authContext = React.createContext();

export function useAuth() {
  return React.useContext(authContext);
}

function useContextDefinition() {
  return {banana: true};
}

export function ProvideAuth({children}) {
  const auth = useContextDefinition();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
