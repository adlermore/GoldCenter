// redux/providers.js
'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';

export function Providers({ children }) {

  useEffect(()=>{
    console.log('children testing' , children);
  },[])
  
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
