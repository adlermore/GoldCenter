// redux/providers.js
'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

export function Providers({ children }) {

  useEffect(() => {
    console.log('children testing', children);
  }, [])

  return (
    <Provider store={store}>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </Provider>
  );
}
