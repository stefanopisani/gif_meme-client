import React from 'react';

// 2 components, 1 sends info and the other 1 consume them
const { Consumer, Provider } = React.createContext();

export const LoggedUserConsumer = Consumer;
export const LoggedUserProvider = Provider;