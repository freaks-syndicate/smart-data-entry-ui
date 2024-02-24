'use client';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';

import { client } from '@/apollo/client.mjs';

export interface IProvidersProps {
  children: React.ReactNode;
}

export default function Providers(props: IProvidersProps) {
  const { children } = props;
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ChakraProvider>
  );
}
